import { NISS_ARMOR_SET } from '@/src/renderer/tables/armorItems/NissArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const NissArmorSet = () => {
  return <InventoryForm dataSet={NISS_ARMOR_SET} />;
};
