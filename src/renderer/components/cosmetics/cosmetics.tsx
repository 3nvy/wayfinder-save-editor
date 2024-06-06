import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ItemCard } from '../item-card/item-card';

const data = [
  {
    type: 'Persona',
    key: 'EventideHatKyros',
    localizedString: 'Eventide Hat Kyros',
    icon: '/Icons/Personas/RenderedOfficial/Kyros/Seasonal/Kyros_Head_Eventide',
  },
  {
    type: 'Persona',
    key: 'EventideHatNiss',
    localizedString: 'Eventide Hat Niss',
    icon: '/Icons/Personas/RenderedOfficial/Niss/Seasonal/Niss_Head_Eventide',
  },
  {
    type: 'Persona',
    key: 'EventideHatSilo',
    localizedString: 'Eventide Hat Silo',
    icon: '/Icons/Personas/RenderedOfficial/Silo/Seasonal/Silo_Head_Eventide',
  },
  {
    type: 'Persona',
    key: 'EventideHatSenja',
    localizedString: 'Eventide Hat Senja',
    icon: '/Icons/Personas/RenderedOfficial/Senja/Seasonal/Senja_Head_Eventide',
  },
  {
    type: 'Persona',
    key: 'EventideHatWingrave',
    localizedString: 'Eventide Hat Wingrave',
    icon: '/Icons/Personas/RenderedOfficial/Wingrave/Seasonal/Wingrave_Head_Eventide',
  },
  {
    type: 'Persona',
    key: 'EventideHatVenomess',
    localizedString: 'Eventide Hat Venomess',
    icon: '/Icons/Personas/RenderedOfficial/Venomess/Seasonal/Venomess_Head_Eventide',
  },
  {
    type: 'Persona',
    key: 'EventideHatGrendel',
    localizedString: 'Eventide Hat Grendel',
    icon: '/Icons/Personas/RenderedOfficial/Grendel/Seasonal/Grendel_Head_Eventide',
  },
];

export const Cosmetics = () => {
  return (
    <Tabs
      defaultValue="inventory"
      className="w-dvw h-dvh flex items-center flex-col p-5 pt-10"
    >
      <TabsList>
        <TabsTrigger value="eventide">Eventide</TabsTrigger>
      </TabsList>
      <TabsContent value="eventide">
        <div className="flex flex-wrap gap-5 h-full overflow-auto justify-center">
          {data.map((c) => (
            <ItemCard key={c.key} item={c} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
