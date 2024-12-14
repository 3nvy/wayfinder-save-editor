/* eslint-disable react/button-has-type */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSaveContext } from '../context/context';
import { AccountSlots } from '../components/account-slots/account-slots';

export const EditAccountPage = () => {
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
        defaultValue="save-slots"
        className="w-dvw h-dvh flex items-center flex-col p-5 pt-10"
      >
        <TabsList>
          <TabsTrigger value="save-slots">Save Slots</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="save-slots">
          <AccountSlots />
        </TabsContent>
        <TabsContent value="challenges">
          <p>Challenges</p>
        </TabsContent>
      </Tabs>
    </>
  );
};
