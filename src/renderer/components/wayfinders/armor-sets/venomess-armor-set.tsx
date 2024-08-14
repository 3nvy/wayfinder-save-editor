import { VENOMESS_ARMOR_SET } from '@/src/renderer/tables/armorItems/VenomessArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const VenomessArmorSet = () => {
  return <InventoryForm dataSet={VENOMESS_ARMOR_SET} />;
};
