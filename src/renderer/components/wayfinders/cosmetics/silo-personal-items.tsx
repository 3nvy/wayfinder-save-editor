import { SILO_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/TacticianPersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const SiloPersonalItems = () => {
  return <InventoryForm dataSet={SILO_PERSONAL_ITEMS} />;
};
