import { CRITICAL_PACK } from '@/src/renderer/tables/critical-pack';
import { InventoryForm } from '../../forms/inventory-form';

export const CriticalTab = () => {
  return <InventoryForm dataSet={CRITICAL_PACK} />;
};
