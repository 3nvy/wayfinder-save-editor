import { NISS_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/NissPersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const NissPersonalItems = () => {
  return <InventoryForm dataSet={NISS_PERSONAL_ITEMS} />;
};
