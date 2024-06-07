import { FOUNDER_ITEMS } from '@/src/renderer/tables/founders';
import { InventoryForm } from '../../forms/inventory-form';

export const FoundersTab = () => {
  return <InventoryForm dataSet={FOUNDER_ITEMS} />;
};
