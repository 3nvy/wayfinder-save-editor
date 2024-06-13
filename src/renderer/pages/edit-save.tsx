import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BattlePassPropForm } from '../components/battlepass-prop-form/battlepass-prop-form';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RawPropForm } from '../components/raw-prop-form/raw-prop-form';
import { useContext } from 'react';
import { SaveEditorContext } from '../context/context';
import { Inventory } from '../components/inventory/inventory';
import { ExperimentalTab } from '../components/experimental/experiemntal';
import { Echos } from '../components/echos/echos';

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
          <TabsTrigger value="echos">Echos</TabsTrigger>
          <TabsTrigger value="rewardTower">Reward Tower</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
          <TabsTrigger value="rawStructure">
            <ExclamationTriangleIcon className="mr-2" /> Raw Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Inventory />
        </TabsContent>
        <TabsContent value="echos">
          <Echos />
        </TabsContent>
        <TabsContent value="rewardTower">
          <BattlePassPropForm />
        </TabsContent>
        <TabsContent value="experimental">
          <ExperimentalTab />
        </TabsContent>
        <TabsContent value="rawStructure">
          <RawPropForm />
        </TabsContent>
      </Tabs>
    </>
  );
};
