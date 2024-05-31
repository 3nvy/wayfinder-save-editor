import { useState, createContext, useCallback } from 'react';
import { SaveData } from '../saveFileTypes';
import { useToast } from '@/components/ui/use-toast';

type Structure = { [key: string]: any };

type InitialValue = {
  decodedFile?: Structure;
  saveStructure?: SaveData;
  fileName?: string;
  saveDecodedStructure: ({
    fileMetadata,
    decodedSave,
    saveStructure,
  }: any) => void;
  saveNewValues: (newSaveData: SaveData) => void;
};

const initialValue: InitialValue = {
  decodedFile: {},
  saveStructure: {},
  fileName: '',
  saveDecodedStructure: () => {},
  saveNewValues: () => {},
};

export const SaveEditorContext = createContext(initialValue);

export const SaveEditorProvider = ({ children }: any) => {
  const { toast } = useToast();
  const [fileMetadata, saveFileMetadata] = useState<any>();
  const [decodedFile, setDecodedFile] = useState<Structure>();
  const [saveStructure, setSaveStructure] = useState<SaveData>();

  const saveDecodedStructure = useCallback(
    ({ fileMetadata, decodedSave, saveStructure }: any) => {
      saveFileMetadata(fileMetadata);
      setDecodedFile(decodedSave);
      setSaveStructure(saveStructure);
    },
    [setDecodedFile, setSaveStructure],
  );

  const saveNewValues = useCallback(
    (newSaveData: SaveData) => {
      window.electron.ipcRenderer.sendMessage(
        'encode-file',
        fileMetadata,
        decodedFile,
        newSaveData,
      );

      window.electron.ipcRenderer.once('encode-file', (responseCode) => {
        if (responseCode === 200)
          toast({
            title: 'Save File Updated!',
          });
        else
          toast({
            variant: 'destructive',
            title: 'Failed to update the Save File',
          });
      });

      setSaveStructure(newSaveData);
    },
    [decodedFile, setSaveStructure, fileMetadata],
  );

  return (
    <SaveEditorContext.Provider
      value={{
        saveDecodedStructure,
        saveNewValues,
        decodedFile,
        saveStructure,
        fileName: fileMetadata?.name,
      }}
    >
      {children}
    </SaveEditorContext.Provider>
  );
};
