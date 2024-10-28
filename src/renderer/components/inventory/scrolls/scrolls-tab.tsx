import { XP_SCROLL_ITEMS } from '@/src/renderer/tables/exp-scrolls';
import { InventoryForm } from '../../forms/inventory-form';

export const ScrollsTab = () => {
  return <InventoryForm dataSet={XP_SCROLL_ITEMS} />;
};
