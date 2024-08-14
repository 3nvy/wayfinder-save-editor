import { SENJA_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/GladiatorPersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const SenjaPersonalItems = () => {
  return <InventoryForm dataSet={SENJA_PERSONAL_ITEMS} />;
};
