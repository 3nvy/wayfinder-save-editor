import {
  DLC_01_PERSONA_ITEMS,
  DLC_02_PERSONA_ITEMS,
  DLC_03_PERSONA_ITEMS,
  DLC_MOUNT_ITEMS,
  DLC_NIGHTMARE_PERSONA_ITEMS,
  DLC_PLAYER_BADGE_ITEMS,
  EXTRA_NIGTHMARE_ITEMS,
} from '@/src/renderer/tables/dlc-items';
import { InventoryForm } from '../../forms/inventory-form';

const DLC_ITEMS = [
  ...DLC_MOUNT_ITEMS,
  ...DLC_01_PERSONA_ITEMS,
  ...DLC_02_PERSONA_ITEMS,
  ...DLC_03_PERSONA_ITEMS,
  ...DLC_NIGHTMARE_PERSONA_ITEMS,
  ...DLC_PLAYER_BADGE_ITEMS,
  ...EXTRA_NIGTHMARE_ITEMS,
];

export const DLCTab = () => {
  return <InventoryForm dataSet={DLC_ITEMS} />;
};
