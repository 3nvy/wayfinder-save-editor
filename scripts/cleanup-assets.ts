import { POTIONS } from '../src/renderer/tables/potions';
import { WEAPONS } from '../src/renderer/tables/weapons/weapons';
import {
  CRITICAL_PACK_HOUSING_ITEMS,
  EVENTIDE_PACK_HOUSING_ITEMS,
  STANDARD_HOUSING_ITEMS,
} from '../src/renderer/tables/housing';
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
import { GRENDEL_ARMOR_SET } from '../src/renderer/tables/armorItems/GrendelArmorItems';
import { KYROS_ARMOR_SET } from '../src/renderer/tables/armorItems/KyrosArmorItems';
import { NISS_ARMOR_SET } from '../src/renderer/tables/armorItems/NissArmorItems';
import { SENJA_ARMOR_SET } from '../src/renderer/tables/armorItems/SenjaArmorItems';
import { SILO_ARMOR_SET } from '../src/renderer/tables/armorItems/SiloArmorItems';
import { VENOMESS_ARMOR_SET } from '../src/renderer/tables/armorItems/VenomessArmorItems';
import { WINGRAVE_ARMOR_SET } from '../src/renderer/tables/armorItems/WingraveArmorItems';
import { BATTLEMAGE_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/BattleMagePersonaItems';
import { CHARACTER_TRINKETS } from '../src/renderer/tables/cosmetics/Character_Trinkets';
import { WINGRAVE_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/CrusaderPersonaItems';
import { EVENTIDE_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/EventidePersonaItems';
import { SENJA_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/GladiatorPersonaItems';
import { GLOOM_DAGGERS } from '../src/renderer/tables/cosmetics/GloomDaggerItems';
import { NISS_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/NissPersonaItems';
import { SILO_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/TacticianPersonaItems';
import { VENOMESS_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/VenomessPersonaItems';
import { WEAPON_CHARMS } from '../src/renderer/tables/cosmetics/WeaponCharms';
import { CRITICAL_PACK, DLC_PACK } from '../src/renderer/tables/critical-pack';
import { EVENT_ITEMS } from '../src/renderer/tables/event-items';
import { LORA_ARMOR_SET } from '../src/renderer/tables/armorItems/LoraArmorItems';
import { LORA_PERSONAL_ITEMS } from '../src/renderer/tables/cosmetics/LoraPersonaItems';
import { XP_SCROLL_ITEMS } from '../src/renderer/tables/exp-scrolls';
import { DYES_ITEMS } from '../src/renderer/tables/dyes';
import ARCANIST_TREE from '../src/renderer/tables/archetypeTrees/arcanistTree';
import SURVIVALIST_TREE from '../src/renderer/tables/archetypeTrees/survivalistTree';
import WARMASTER_TREE from '../src/renderer/tables/archetypeTrees/warmasterTree';
import { AttributesMetadata } from '../src/renderer/tables/attributesMetadata';
import {
  AbilitiesInfo,
  AspectInfo,
  CharacterInfo,
} from '../src/renderer/curves/character-level-curve';
import DLC_ITEMS from '../src/renderer/tables/dlc-items';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ARCHETYPE_TREES = [
  ...ARCANIST_TREE,
  ...SURVIVALIST_TREE,
  ...WARMASTER_TREE,
].filter((i) => i.icon);

const ATTRIBUTES_METADATA = Object.values(AttributesMetadata).filter(
  (i) => i.icon,
);

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
  ...STANDARD_HOUSING_ITEMS,
  ...WEAPONS,
  ...WEAPON_AWAKENING_PARTS,
  ...GRENDEL_ARMOR_SET,
  ...KYROS_ARMOR_SET,
  ...NISS_ARMOR_SET,
  ...SENJA_ARMOR_SET,
  ...SILO_ARMOR_SET,
  ...VENOMESS_ARMOR_SET,
  ...WINGRAVE_ARMOR_SET,
  ...BATTLEMAGE_PERSONAL_ITEMS,
  ...CHARACTER_TRINKETS,
  ...WINGRAVE_PERSONAL_ITEMS,
  ...EVENTIDE_PERSONAL_ITEMS,
  ...SENJA_PERSONAL_ITEMS,
  ...GLOOM_DAGGERS,
  ...NISS_PERSONAL_ITEMS,
  ...SILO_PERSONAL_ITEMS,
  ...VENOMESS_PERSONAL_ITEMS,
  ...WEAPON_CHARMS,
  ...EVENTIDE_PACK_HOUSING_ITEMS,
  ...CRITICAL_PACK,
  ...CRITICAL_PACK_HOUSING_ITEMS,
  ...DLC_PACK,
  ...POTIONS,
  ...EVENT_ITEMS,
  ...LORA_ARMOR_SET,
  ...LORA_PERSONAL_ITEMS,
  ...XP_SCROLL_ITEMS,
  ...DYES_ITEMS,
  ...ARCHETYPE_TREES,
  ...ATTRIBUTES_METADATA,
  ...DLC_ITEMS,
  ...Object.values(AbilitiesInfo),
  ...Object.values(CharacterInfo),
  ...Object.values(AspectInfo),
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
        quality: 30, // Adjust the quality level (0-100)
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
