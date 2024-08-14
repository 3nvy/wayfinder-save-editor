import { WINGRAVE_ARMOR_SET } from '@/src/renderer/tables/armorItems/WingraveArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const WingraveArmorSet = () => {
  return <InventoryForm dataSet={WINGRAVE_ARMOR_SET} />;
};
