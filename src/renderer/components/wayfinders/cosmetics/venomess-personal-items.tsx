import { VENOMESS_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/VenomessPersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const VenomessPersonalItems = () => {
  return <InventoryForm dataSet={VENOMESS_PERSONAL_ITEMS} />;
};
