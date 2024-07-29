import { GLOOM_DAGGERS } from '@/src/renderer/tables/cosmetics/GloomDaggerItems';
import { InventoryForm } from '../../forms/inventory-form';

export const GloomDaggers = () => {
  return <InventoryForm dataSet={GLOOM_DAGGERS} />;
};
