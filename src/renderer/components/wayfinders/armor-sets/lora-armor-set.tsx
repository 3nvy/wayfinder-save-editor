import { LORA_ARMOR_SET } from '@/src/renderer/tables/armorItems/LoraArmorItems';
import { InventoryForm } from '../../forms/inventory-form';

export const LoraArmorSet = () => {
  return <InventoryForm dataSet={LORA_ARMOR_SET} />;
};
