import { GRENDEL_ARMOR_SET } from '@/src/renderer/tables/armorItems/GrendelArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const GrendelPersonalItems = () => {
  return <InventoryForm dataSet={GRENDEL_ARMOR_SET} />;
};
