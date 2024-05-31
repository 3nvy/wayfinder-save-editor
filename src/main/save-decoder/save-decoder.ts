import { Gvas, Serializer } from '../gvas-decoder';
import pako from 'pako';
import fs from 'fs';

export const decodeSave = (buffer: any) => {
  const gvas = new Gvas();
  const serial = new Serializer(Buffer.from([...buffer]));
  gvas.deserialize(serial);

  const decodedSave = JSON.parse(JSON.stringify(gvas));
  const compressedSaveStructure = gvas.Properties.Properties[2].Property.Data;
  const saveStructure = pako.inflate(compressedSaveStructure, {
    to: 'string',
  });

  return {
    decodedSave,
    saveStructure: JSON.parse(saveStructure),
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
