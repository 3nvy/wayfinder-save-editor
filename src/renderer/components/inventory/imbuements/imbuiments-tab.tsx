import { IMBUEMENTS } from '@/src/renderer/tables/imbuements';
import { InventoryForm } from '../../forms/inventory-form';

export const ImbuimentsTab = () => {
  return <InventoryForm dataSet={IMBUEMENTS} />;
};
