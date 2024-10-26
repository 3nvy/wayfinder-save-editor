import { POTIONS } from '@/src/renderer/tables/potions';
import { InventoryForm } from '../../forms/inventory-form';

export const PotionsTab = () => {
  return <InventoryForm dataSet={POTIONS} />;
};
