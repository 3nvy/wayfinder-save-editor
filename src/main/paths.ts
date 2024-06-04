/* eslint-disable no-underscore-dangle */
import { app } from 'electron';
import path from 'path';

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');
