import { WEAPON_CHARMS } from '@/src/renderer/tables/cosmetics/WeaponCharms';
import { InventoryForm } from '../../forms/inventory-form';

export const WeaponCharms = () => {
  return <InventoryForm dataSet={WEAPON_CHARMS} />;
};
