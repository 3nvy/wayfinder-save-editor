import { LORA_PERSONAL_ITEMS } from '@/src/renderer/tables/cosmetics/LoraPersonaItems';
import { InventoryForm } from '../../forms/inventory-form';

export const LoraPersonalItems = () => {
  return <InventoryForm dataSet={LORA_PERSONAL_ITEMS} />;
};
