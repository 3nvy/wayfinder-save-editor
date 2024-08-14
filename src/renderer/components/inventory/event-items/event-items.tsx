import { EVENT_ITEMS } from '@/src/renderer/tables/event-items';
import { InventoryForm } from '../../forms/inventory-form';

export const EventItemsTab = () => {
  return <InventoryForm dataSet={EVENT_ITEMS} />;
};
