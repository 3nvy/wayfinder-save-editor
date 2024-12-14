import pako from 'pako';
import fs from 'fs';
import { Gvas, Serializer } from '../gvas-decoder';

export const decodeSave = (buffer: any) => {
  const gvas: any = new Gvas();
  const serial = new Serializer(Buffer.from([...buffer]));
  gvas.deserialize(serial);

  const decodedSave: any = JSON.parse(JSON.stringify(gvas));

  const fileSaveType = decodedSave.Properties.Name.replace(
    /[^a-zA-Z0-9\/.]/g,
    '',
  );
  let saveStructure;

  if (fileSaveType === '/Script/Wayfinder.WFSaveGame') {
    // returns the save file decoded structure
    const compressedSaveStructure = gvas.Properties.Properties[2].Property.Data;
    const decodedStructure = pako.inflate(compressedSaveStructure, {
      to: 'string',
    });
    saveStructure = JSON.parse(decodedStructure);
  } else {
    // Returns META structure, containing the current and next save index
    saveStructure =
      decodedSave.Properties.Properties[0].Properties[0].Properties.reduce(
        (acc: { [key: string]: any }, x: any) => {
          acc[x.Name.replace(/[^a-zA-Z0-9\/.]/g, '')] = x.Property;
          return acc;
        },
        {},
      );
  }

  return {
    fileSaveType,
    decodedSave,
    saveStructure,
  };
};

export const encodeSave = (
  fileMetadata: any,
  decodedSave: any,
  newSaveStructure: any,
) => {
  try {
    const stringifiedData = JSON.stringify(newSaveStructure);
    const compressedData = pako.deflate(stringifiedData, { level: 6 });

    const uncompressedSize = stringifiedData.length;
    const compressedSize = compressedData.byteLength;

    decodedSave.Properties.Properties[0].Property = [0, uncompressedSize];
    decodedSave.Properties.Properties[1].Property = [0, compressedSize];

    decodedSave.Properties.Properties[2].Property.Data = compressedData;
    decodedSave.Properties.Properties[2].Property.Count = compressedSize;

    const gvas2 = Gvas.from(decodedSave);
    const compressedAgain = gvas2.serialize();

    fs.writeFile(fileMetadata.path, compressedAgain, (err) => {
      if (err) throw err;
    });

    return 200;
  } catch (err) {
    return 500;
  }
};
