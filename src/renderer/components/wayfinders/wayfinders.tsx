import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArmorSetsTab } from './armor-sets/armor-sets-tab';

export const Wayfinders = () => {
  return (
    <Tabs
      defaultValue="armor-sets"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="armor-sets">Armor Sets</TabsTrigger>
      </TabsList>
      <TabsContent value="armor-sets">
        <ArmorSetsTab />
      </TabsContent>
    </Tabs>
  );
};
