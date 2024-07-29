import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArmorSetsTab } from './armor-sets/armor-sets-tab';
import { AwakeningStonesTab } from './awakening-stones/awakening-stones-tab';
import { CosmeticsTab } from './cosmetics/cosmetics-tab';

export const Wayfinders = () => {
  return (
    <Tabs
      defaultValue="awakening"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="awakening">Awakening Stones</TabsTrigger>
        <TabsTrigger value="armor-sets">Armor Sets</TabsTrigger>
        <TabsTrigger value="cosmetics">Cosmetics</TabsTrigger>
      </TabsList>
      <TabsContent value="awakening">
        <AwakeningStonesTab />
      </TabsContent>
      <TabsContent value="armor-sets">
        <ArmorSetsTab />
      </TabsContent>
      <TabsContent value="cosmetics">
        <CosmeticsTab />
      </TabsContent>
    </Tabs>
  );
};
