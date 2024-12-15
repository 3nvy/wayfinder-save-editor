import { ipcMain } from 'electron';
import {
  decodeSave,
  encodeMetaSave,
  encodeSave,
} from './save-decoder/save-decoder';
import { ipcChannels } from '../config/ipc-channels';
import { RESOURCES_PATH } from './paths';

export default {
  initialize() {
    /**
     * IPC PATHS
     */
    ipcMain.on(ipcChannels.DECODE_FILE, async (event, buffer) => {
      const { decodedSave, saveStructure, fileSaveType } = decodeSave(buffer);
      event.reply(ipcChannels.DECODE_FILE, {
        decodedSave,
        saveStructure,
        fileSaveType,
      });
    });

    ipcMain.on(
      ipcChannels.ENCODE_FILE,
      async (event, fileMetadata, decodedSave, newSaveData) => {
        const resultCode = encodeSave(fileMetadata, decodedSave, newSaveData);
        event.reply(ipcChannels.ENCODE_FILE, resultCode);
      },
    );

    ipcMain.on(
      ipcChannels.ENCODE_META_FILE,
      async (event, fileMetadata, decodedSave, newSaveData) => {
        const resultCode = encodeMetaSave(
          fileMetadata,
          decodedSave,
          newSaveData,
        );
        event.reply(ipcChannels.ENCODE_META_FILE, resultCode);
      },
    );

    ipcMain.handle(ipcChannels.GET_ASSETS_PATH, () => RESOURCES_PATH);
  },
};
