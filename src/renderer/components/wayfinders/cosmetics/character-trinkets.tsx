import { CHARACTER_TRINKETS } from '@/src/renderer/tables/cosmetics/Character_Trinkets';
import { InventoryForm } from '../../forms/inventory-form';

export const CharacterTrinkets = () => {
  return <InventoryForm dataSet={CHARACTER_TRINKETS} />;
};
