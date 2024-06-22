import {
  ENEMY_RESOURCES,
  UNIQUE_RESOURCES,
} from '@/src/renderer/tables/resources';
import { InventoryForm } from '../../forms/inventory-form';

export const ResourcesTab = () => {
  return <InventoryForm dataSet={[...UNIQUE_RESOURCES, ...ENEMY_RESOURCES]} />;
};
