import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountPropForm } from '../components/account-prop-form/account-prop-form';
import { FounderPropForm } from '../components/founder-prop-form/founder-prop-form';
import { BattlePassPropForm } from '../components/battlepass-prop-form/battlepass-prop-form';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RawPropForm } from '../components/raw-prop-form/raw-prop-form';
import { useContext } from 'react';
import { SaveEditorContext } from '../context/context';

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
        defaultValue="account"
        className="w-dvw h-dvh flex items-center flex-col p-5 pt-10"
      >
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="founder">Founder</TabsTrigger>
          <TabsTrigger value="battlepass">Reward Tower</TabsTrigger>
          <TabsTrigger value="rawStructure">
            <ExclamationTriangleIcon className="mr-2" /> Raw Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountPropForm />
        </TabsContent>
        <TabsContent value="founder">
          <FounderPropForm />
        </TabsContent>
        <TabsContent value="battlepass">
          <BattlePassPropForm />
        </TabsContent>
        <TabsContent value="rawStructure">
          <RawPropForm />
        </TabsContent>
      </Tabs>
    </>
  );
};
