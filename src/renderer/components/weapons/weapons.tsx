import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { InventoryWeapons } from './inventory-weapons/inventory-weapons';

export const WeaponsTab = () => {
  return (
    <Tabs
      defaultValue="invWeapons"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="invWeapons">Inventory Weapons</TabsTrigger>
      </TabsList>

      <TabsContent value="invWeapons">
        <InventoryWeapons />
      </TabsContent>
    </Tabs>
  );
};
