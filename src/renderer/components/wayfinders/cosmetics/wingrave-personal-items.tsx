import { WINGRAVE_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/CrusaderPersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const WingravePersonalItems = () => {
  return <InventoryForm dataSet={WINGRAVE_PERSONAL_ITEMS} />;
};
