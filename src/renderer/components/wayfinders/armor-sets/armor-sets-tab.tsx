import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { KyrosArmorSet } from './kyros-armor-set';
import { SenjaArmorSet } from './senja-armor-set';
import { NissArmorSet } from './niss-armor-set';
import { SiloArmorSet } from './silo-armor-set';
import { WingraveArmorSet } from './wingrave-armor-set';
import { VenomessArmorSet } from './venomess-armor-set';
import { GrendelArmorSet } from './grendel-armor-set';

export const ArmorSetsTab = () => {
  return (
    <Tabs
      defaultValue="armor-set-kyros"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="armor-set-kyros">Kyros</TabsTrigger>
        <TabsTrigger value="armor-set-niss">Niss</TabsTrigger>
        <TabsTrigger value="armor-set-senja">Senja</TabsTrigger>
        <TabsTrigger value="armor-set-silo">Silo</TabsTrigger>
        <TabsTrigger value="armor-set-venomess">Venomess</TabsTrigger>
        <TabsTrigger value="armor-set-wingrave">Wingrave</TabsTrigger>
        <TabsTrigger value="armor-set-grendel">Grendel</TabsTrigger>
      </TabsList>
      <TabsContent value="armor-set-kyros">
        <KyrosArmorSet />
      </TabsContent>
      <TabsContent value="armor-set-niss">
        <NissArmorSet />
      </TabsContent>
      <TabsContent value="armor-set-senja">
        <SenjaArmorSet />
      </TabsContent>
      <TabsContent value="armor-set-silo">
        <SiloArmorSet />
      </TabsContent>
      <TabsContent value="armor-set-venomess">
        <VenomessArmorSet />
      </TabsContent>
      <TabsContent value="armor-set-wingrave">
        <WingraveArmorSet />
      </TabsContent>
      <TabsContent value="armor-set-grendel">
        <GrendelArmorSet />
      </TabsContent>
    </Tabs>
  );
};
