import { SENJA_ARMOR_SET } from '@/src/renderer/tables/armorItems/SenjaArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const SenjaArmorSet = () => {
  return <InventoryForm dataSet={SENJA_ARMOR_SET} />;
};
