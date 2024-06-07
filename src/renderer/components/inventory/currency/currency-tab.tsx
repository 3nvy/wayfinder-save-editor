import { CURRENCIES } from '@/src/renderer/tables/currency';
import { InventoryForm } from '../../forms/inventory-form';

export const CurrencyTab = () => {
  return <InventoryForm dataSet={CURRENCIES} />;
};
