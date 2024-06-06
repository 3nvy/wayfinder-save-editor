import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountPropForm } from '../components/account-prop-form/account-prop-form';
import { FounderPropForm } from '../components/founder-prop-form/founder-prop-form';
import { BattlePassPropForm } from '../components/battlepass-prop-form/battlepass-prop-form';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RawPropForm } from '../components/raw-prop-form/raw-prop-form';
import { useContext } from 'react';
import { SaveEditorContext } from '../context/context';
import { ItemCard } from '../components/item-card/item-card';
import { CURRENCIES } from '../tables/currency';
import { Cosmetics } from '../components/cosmetics/cosmetics';
import { Inventory } from '../components/inventory/inventory';

export const EditSavePage = () => {
  const { fileName } = useContext(SaveEditorContext);
  return (
    <>
      <div className="absolute w-full bg-slate-500 p-1 text-white flex justify-between">
        <div>
          <b>File:</b> {fileName}
        </div>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
      <Tabs
        defaultValue="inventory"
        className="w-dvw h-dvh flex items-center flex-col p-5 pt-10"
      >
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="rawStructure">
            <ExclamationTriangleIcon className="mr-2" /> Raw Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Inventory />
        </TabsContent>
        {/* <TabsContent value="cosmetics">
          <Cosmetics />
        </TabsContent>
        <TabsContent value="founder">
          <FounderPropForm />
        </TabsContent>
        <TabsContent value="battlepass">
          <BattlePassPropForm />
        </TabsContent> */}
        <TabsContent value="rawStructure">
          <RawPropForm />
        </TabsContent>
      </Tabs>
    </>
  );
};
