import { InventoryForm } from '../../forms/inventory-form';
import { AWAKENING_STONES } from '@/src/renderer/tables/awakening-stones';

export const AwakeningStonesTab = () => {
  return <InventoryForm dataSet={AWAKENING_STONES} />;
};
