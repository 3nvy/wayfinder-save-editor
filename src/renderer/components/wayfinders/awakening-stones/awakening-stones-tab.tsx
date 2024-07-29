import { AWAKENING_STONES } from '@/src/renderer/tables/awakening-stones';
import { InventoryForm } from '../../forms/inventory-form';

export const AwakeningStonesTab = () => {
  return <InventoryForm dataSet={AWAKENING_STONES} />;
};
