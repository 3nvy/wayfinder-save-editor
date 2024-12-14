import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveEditorContext } from '../../context/context';

type FileMetadata = {
  name: string;
  path: string;
};

const FileChooser: React.FC = () => {
  const navigate = useNavigate();
  const fileMetadata = useRef<FileMetadata>();
  const { saveDecodedStructure } = useContext(SaveEditorContext);

  useEffect(() => {
    window.electron.ipcRenderer.once(
      'decode-file',
      ({ decodedSave, saveStructure, fileSaveType }: any) => {
        saveDecodedStructure({
          fileMetadata: fileMetadata.current,
          decodedSave,
          saveStructure,
        });
        if (fileSaveType === '/Script/Wayfinder.WFSaveGame') {
          navigate('/edit-save');
        } else {
          navigate('/edit-account');
        }
      },
    );
  }, [navigate, saveDecodedStructure]);

  const fileToBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(window.nodeAPI.createBuffer(reader.result as ArrayBuffer));
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const buffer = await fileToBuffer(file);

      fileMetadata.current = {
        name: file.name,
        path: file.path,
      };

      window.electron.ipcRenderer.sendMessage('decode-file', buffer);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".sav" />
    </div>
  );
};

export default FileChooser;
