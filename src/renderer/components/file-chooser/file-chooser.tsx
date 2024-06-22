import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SaveEditorContext } from '../../context/context';

type FileMetadata = {
  name: string;
  path: string;
};

const FileChooser: React.FC = () => {
  const navigate = useNavigate();
  const fileMetadata = useRef<FileMetadata>();
  const { saveDecodedStructure } = useContext(SaveEditorContext);

  // META DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSaveIndex, setCurrentSaveIndex] = useState(0);

  useEffect(() => {
    window.electron.ipcRenderer.once(
      'decode-file',
      ({ decodedSave, saveStructure, fileSaveType }: any) => {
        if (fileSaveType === '/Script/Wayfinder.WFSaveGame') {
          saveDecodedStructure({
            fileMetadata: fileMetadata.current,
            decodedSave,
            saveStructure,
          });
          navigate('/edit-save');
        } else {
          setCurrentSaveIndex(saveStructure.CurrentSaveGameIndex);
          setIsDialogOpen(true);
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

  const onMetaDialogClose = () => {
    window.location.reload();
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
      <Dialog open={isDialogOpen} onOpenChange={onMetaDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{fileMetadata.current?.name}</DialogTitle>
            <DialogDescription>
              The current save is <b>WayfinderSave_{currentSaveIndex}.sav</b>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={onMetaDialogClose}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <input type="file" onChange={handleFileChange} accept=".sav" />
    </div>
  );
};

export default FileChooser;
