import { DYES_ITEMS } from '@/src/renderer/tables/dyes';
import { InventoryForm } from '../../forms/inventory-form';

export const DyesTab = () => {
  return <InventoryForm dataSet={DYES_ITEMS} />;
};
