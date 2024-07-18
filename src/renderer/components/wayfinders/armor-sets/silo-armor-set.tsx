import { SILO_ARMOR_SET } from '@/src/renderer/tables/armorItems/SiloArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const SiloArmorSet = () => {
  return <InventoryForm dataSet={SILO_ARMOR_SET} />;
};
