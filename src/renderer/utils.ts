import { v4 as uuidv4 } from 'uuid';

export const generateUniqueID = () =>
  uuidv4()
    .replace(/-/g, '')
    .replace(/[a-zA-Z]/g, (match) => match.toUpperCase());

export const generateSeed = () =>
  Math.floor(1000000000 + Math.random() * 5000000000);
