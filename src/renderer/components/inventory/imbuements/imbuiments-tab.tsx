import { InventoryForm } from '../../forms/inventory-form';
import { IMBUEMENTS } from '@/src/renderer/tables/imbuements';

export const ImbuimentsTab = () => {
  return <InventoryForm dataSet={IMBUEMENTS} />;
};
