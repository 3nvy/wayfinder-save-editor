import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CurrencyTab } from './currency/currency-tab';
import { ResourcesTab } from './resources/resources-tab';
export const Inventory = () => {
  return (
    <Tabs
      defaultValue="currency"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="currency">Currency</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      <TabsContent value="currency">
        <CurrencyTab />
      </TabsContent>
      <TabsContent value="resources">
        <ResourcesTab />
      </TabsContent>
    </Tabs>
  );
};
