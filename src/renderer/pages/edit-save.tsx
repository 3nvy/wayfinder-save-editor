/* eslint-disable react/button-has-type */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { BattlePassPropForm } from '../components/battlepass-prop-form/battlepass-prop-form';
import { RawPropForm } from '../components/raw-prop-form/raw-prop-form';
import { useSaveContext } from '../context/context';
import { Inventory } from '../components/inventory/inventory';
import { Echos } from '../components/echos/echos';
import { Accessories } from '../components/accessories/accessories';
import { WeaponsTab } from '../components/weapons/weapons';
import { Wayfinders } from '../components/wayfinders/wayfinders';
import { Characters } from '../components/characters/characters';

export const EditSavePage = () => {
  const { fileName } = useSaveContext();
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
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="wayfinders">Wayfinders</TabsTrigger>
          <TabsTrigger value="echos">Echos</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="rewardTower">Reward Tower</TabsTrigger>
          <TabsTrigger value="rawStructure">
            <ExclamationTriangleIcon className="mr-2" /> Raw Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="characters">
          <Characters />
        </TabsContent>
        <TabsContent value="inventory">
          <Inventory />
        </TabsContent>
        <TabsContent value="wayfinders">
          <Wayfinders />
        </TabsContent>
        <TabsContent value="echos">
          <Echos />
        </TabsContent>
        <TabsContent value="accessories">
          <Accessories />
        </TabsContent>
        <TabsContent value="weapons">
          <WeaponsTab />
        </TabsContent>
        <TabsContent value="rewardTower">
          <BattlePassPropForm />
        </TabsContent>
        <TabsContent value="rawStructure">
          <RawPropForm />
        </TabsContent>
      </Tabs>
    </>
  );
};
