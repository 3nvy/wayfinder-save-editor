import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CurrencyTab } from './currency/currency-tab';
import { ResourcesTab } from './resources/resources-tab';
import { FoundersTab } from './founders/founders-tab';
import { MountsTab } from './mounts/mounts-tab';
import { ImbuimentsTab } from './imbuements/imbuiments-tab';
import { AwakeningStonesTab } from './awakening-stones/awakening-stones-tab';
import { HousingTab } from './housing/housing-tab';
export const Inventory = () => {
  return (
    <Tabs
      defaultValue="currency"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="currency">Currency</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="imbuements">Imbuements</TabsTrigger>
        <TabsTrigger value="mounts">Mounts</TabsTrigger>
        <TabsTrigger value="housing">Housing</TabsTrigger>
        <TabsTrigger value="awakening">Awakening Stones</TabsTrigger>
        <TabsTrigger value="founders">Founders</TabsTrigger>
      </TabsList>
      <TabsContent value="currency">
        <CurrencyTab />
      </TabsContent>
      <TabsContent value="resources">
        <ResourcesTab />
      </TabsContent>
      <TabsContent value="imbuements">
        <ImbuimentsTab />
      </TabsContent>
      <TabsContent value="mounts">
        <MountsTab />
      </TabsContent>
      <TabsContent value="housing">
        <HousingTab />
      </TabsContent>
      <TabsContent value="awakening">
        <AwakeningStonesTab />
      </TabsContent>
      <TabsContent value="founders">
        <FoundersTab />
      </TabsContent>
    </Tabs>
  );
};
