import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { InventoryWeapons } from './inventory-weapons/inventory-weapons';
import { WeaponAwakeningItems } from './awakening-crafting/awakening-crafting';
import { WeaponAwakeningLevels } from './awakening-levels/awakening-levels';

export const WeaponsTab = () => {
  return (
    <Tabs
      defaultValue="invWeapons"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="invWeapons">Inventory Weapons</TabsTrigger>
        <TabsTrigger value="weaponAwakeningItems">Awakening Parts</TabsTrigger>
        <TabsTrigger value="awakeningLevels">Awakening Levels</TabsTrigger>
      </TabsList>

      <TabsContent value="invWeapons">
        <InventoryWeapons />
      </TabsContent>

      <TabsContent value="weaponAwakeningItems">
        <WeaponAwakeningItems />
      </TabsContent>

      <TabsContent value="awakeningLevels">
        <WeaponAwakeningLevels />
      </TabsContent>
    </Tabs>
  );
};
