import { BATTLEMAGE_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/BattleMagePersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const BattleMagePersonalItems = () => {
  return <InventoryForm dataSet={BATTLEMAGE_PERSONAL_ITEMS} />;
};
