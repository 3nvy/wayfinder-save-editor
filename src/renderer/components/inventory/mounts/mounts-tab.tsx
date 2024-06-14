import { MOUNTS } from '@/src/renderer/tables/mounts';
import { InventoryForm } from '../../forms/inventory-form';

export const MountsTab = () => {
  return <InventoryForm dataSet={MOUNTS} />;
};
