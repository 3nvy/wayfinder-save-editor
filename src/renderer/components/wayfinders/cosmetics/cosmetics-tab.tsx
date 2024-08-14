import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BattleMagePersonalItems } from './battlemage-personal-items';
import { NissPersonalItems } from './niss-personal-items';
import { SenjaPersonalItems } from './senja-personal-items';
import { SiloPersonalItems } from './silo-personal-items';
import { VenomessPersonalItems } from './venomess-personal-items';
import { WingravePersonalItems } from './wingrave-personal-items';
import { GrendelPersonalItems } from './grendel-personal-items';
import { CharacterTrinkets } from './character-trinkets';
import { EventidePersonalItems } from './eventide-personal-items';
import { GloomDaggers } from './gloom-daggers';
import { WeaponCharms } from './weapon-charms';

export const CosmeticsTab = () => {
  return (
    <Tabs
      defaultValue="cosmetic-kyros"
      className="w-dvw h-dvh flex items-center flex-col max-w-full max-h-full"
    >
      <TabsList>
        <TabsTrigger value="cosmetic-kyros">Kyros</TabsTrigger>
        <TabsTrigger value="cosmetic-niss">Niss</TabsTrigger>
        <TabsTrigger value="cosmetic-senja">Senja</TabsTrigger>
        <TabsTrigger value="cosmetic-silo">Silo</TabsTrigger>
        <TabsTrigger value="cosmetic-venomess">Venomess</TabsTrigger>
        <TabsTrigger value="cosmetic-wingrave">Wingrave</TabsTrigger>
        <TabsTrigger value="cosmetic-grendel">Grendel</TabsTrigger>
        <TabsTrigger value="cosmetic-eventide">Eventide</TabsTrigger>
        <TabsTrigger value="cosmetic-character-trinkets">Trinkets</TabsTrigger>
        <TabsTrigger value="cosmetic-weapon-charms">Charms</TabsTrigger>
        <TabsTrigger value="cosmetic-daggers">Daggers</TabsTrigger>
      </TabsList>
      <TabsContent value="cosmetic-kyros">
        <BattleMagePersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-niss">
        <NissPersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-senja">
        <SenjaPersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-silo">
        <SiloPersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-venomess">
        <VenomessPersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-wingrave">
        <WingravePersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-grendel">
        <GrendelPersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-eventide">
        <EventidePersonalItems />
      </TabsContent>
      <TabsContent value="cosmetic-character-trinkets">
        <CharacterTrinkets />
      </TabsContent>
      <TabsContent value="cosmetic-weapon-charms">
        <WeaponCharms />
      </TabsContent>
      <TabsContent value="cosmetic-daggers">
        <GloomDaggers />
      </TabsContent>
    </Tabs>
  );
};
