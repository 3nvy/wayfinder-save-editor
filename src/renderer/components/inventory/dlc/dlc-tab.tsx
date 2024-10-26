import { DLC_PACK } from '@/src/renderer/tables/critical-pack';
import { InventoryForm } from '../../forms/inventory-form';

export const DLCTab = () => {
  return <InventoryForm dataSet={DLC_PACK} />;
};
