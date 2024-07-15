import { WEAPON_AWAKENING_PARTS } from '@/src/renderer/tables/weapons/WeaponAwakeningParts';
import { InventoryForm } from '../../forms/inventory-form';

export const WeaponAwakeningItems = () => {
  return <InventoryForm dataSet={WEAPON_AWAKENING_PARTS} />;
};
