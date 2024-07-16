import { WEAPONS } from '../src/renderer/tables/weapons';
import { HOUSING_ITEMS } from '../src/renderer/tables/housing';
import { ACCESSORIES } from '../src/renderer/tables/accessories';
import { AWAKENING_STONES } from '../src/renderer/tables/awakening-stones';
import { CURRENCIES } from '../src/renderer/tables/currency';
import { ECHOS } from '../src/renderer/tables/echos';
import { FOUNDER_ITEMS } from '../src/renderer/tables/founders';
import { IMBUEMENTS } from '../src/renderer/tables/imbuements';
import { MOUNTS } from '../src/renderer/tables/mounts';
import {
  UNIQUE_RESOURCES,
  ENEMY_RESOURCES,
} from '../src/renderer/tables/resources';
import { WEAPON_AWAKENING_PARTS } from '../src/renderer/tables/weapons/WeaponAwakeningParts';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const REQUIRED_ASSETS = [
  ...CURRENCIES,
  ...FOUNDER_ITEMS,
  ...UNIQUE_RESOURCES,
  ...ENEMY_RESOURCES,
  ...IMBUEMENTS,
  ...MOUNTS,
  ...ECHOS,
  ...AWAKENING_STONES,
  ...ACCESSORIES,
  ...HOUSING_ITEMS,
  ...WEAPONS,
  ...WEAPON_AWAKENING_PARTS,
]
  .map((i) => `${i.icon}.png`)
  .concat([
    'EchoMenu/boltCapacity_icon.png',
    'EchoMenu/echoSlot_Alfa.png',
    'EchoMenu/echoSlot_Bravo.png',
    'EchoMenu/echoSlot_Charlie.png',
    'EchoMenu/echoSlot_Delta.png',
    'EchoMenu/echoSlot_Echo.png',
    'EchoMenu/essenceIcon.png',
    'Icons/Currency/icoon_currency_XP_01.png',
    'Icons/Currency/icon_currency_BattlePassKey.png',
  ]);

function getAllFilePaths(rootDir: string) {
  const fileToRemovePaths: string[] = [];
  const filesToKeep: string[] = [];

  function traverseDirectory(currentDir: string) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        traverseDirectory(filePath);
      } else {
        const path = filePath
          .replaceAll('\\', '/')
          .replace('assets/', '')
          .replace('icons', 'Icons');

        if (!REQUIRED_ASSETS.includes(path)) fileToRemovePaths.push(path);
        else filesToKeep.push(path);
      }
    }
  }

  traverseDirectory(rootDir);
  return [filesToKeep, fileToRemovePaths];
}

function removeAllFiles(filePaths: string[]) {
  for (const filePath of filePaths) {
    fs.unlinkSync(filePath);
  }
}

// Example usage
const rootDir = './assets/icons/';
const [filesToKeep, fileToRemovePaths] = getAllFilePaths(rootDir);

removeAllFiles(
  fileToRemovePaths.map((i) => i.replace('Icons', 'assets/icons')),
);

filesToKeep
  .map((i) => i.replace('Icons', 'assets/icons'))
  .forEach((path) => {
    // Read the input PNG file
    const inputBuffer = fs.readFileSync(path);

    // Compress the PNG file
    sharp(inputBuffer)
      .png({
        quality: 40, // Adjust the quality level (0-100)
        progressive: true, // Enable progressive rendering
        adaptiveFiltering: true, // Enable adaptive filtering
      })
      .toBuffer()
      .then((outputBuffer: any) => {
        // Write the compressed PNG file
        fs.writeFileSync(path, outputBuffer);
      })
      .catch((err: Error) => {
        console.error('Error compressing PNG:', err);
      });
  });
