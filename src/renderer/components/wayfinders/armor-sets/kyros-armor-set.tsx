import { KYROS_ARMOR_SET } from '@/src/renderer/tables/armorItems/KyrosArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const KyrosArmorSet = () => {
  return <InventoryForm dataSet={KYROS_ARMOR_SET} />;
};
