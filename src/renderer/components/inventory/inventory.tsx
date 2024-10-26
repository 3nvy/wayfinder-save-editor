import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CurrencyTab } from './currency/currency-tab';
import { ResourcesTab } from './resources/resources-tab';
import { FoundersTab } from './founders/founders-tab';
import { MountsTab } from './mounts/mounts-tab';
import { ImbuimentsTab } from './imbuements/imbuiments-tab';
import { HousingTab } from './housing/housing-tab';
import { EventItemsTab } from './event-items/event-items';
import { CriticalTab } from './critical/critical-tab';
import { DLCTab } from './dlc/dlc-tab';
import { PotionsTab } from './potions/potions-tab';

export const Inventory = () => {
  return (
    <Tabs
      defaultValue="currency"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="currency">Currency</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="potions">Potions</TabsTrigger>
        <TabsTrigger value="event-items">Event Items</TabsTrigger>
        <TabsTrigger value="imbuements">Imbuements</TabsTrigger>
        <TabsTrigger value="mounts">Mounts</TabsTrigger>
        <TabsTrigger value="housing">Housing</TabsTrigger>
        <TabsTrigger value="founders">Founders</TabsTrigger>
        <TabsTrigger value="critical">Critical Pack</TabsTrigger>
        <TabsTrigger value="dlc">Extra DLC Stuff</TabsTrigger>
      </TabsList>
      <TabsContent value="currency">
        <CurrencyTab />
      </TabsContent>
      <TabsContent value="resources">
        <ResourcesTab />
      </TabsContent>
      <TabsContent value="potions">
        <PotionsTab />
      </TabsContent>
      <TabsContent value="event-items">
        <EventItemsTab />
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
      <TabsContent value="founders">
        <FoundersTab />
      </TabsContent>
      <TabsContent value="critical">
        <CriticalTab />
      </TabsContent>
      <TabsContent value="dlc">
        <DLCTab />
      </TabsContent>
    </Tabs>
  );
};
