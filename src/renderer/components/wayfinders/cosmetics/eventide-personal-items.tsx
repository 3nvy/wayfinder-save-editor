import { EVENTIDE_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/EventidePersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const EventidePersonalItems = () => {
  return <InventoryForm dataSet={EVENTIDE_PERSONAL_ITEMS} />;
};
