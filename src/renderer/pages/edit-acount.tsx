/* eslint-disable react/button-has-type */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSaveContext } from '../context/context';
import { AccountSlots } from '../components/account/account-slots';
import { AccountChallenges } from '../components/account/account-challenges';

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
        defaultValue="nightmare-challenges"
        className="w-dvw h-dvh flex items-center flex-col p-5 pt-10"
      >
        <TabsList>
          {/* <TabsTrigger value="save-slots">Save Slots</TabsTrigger> */}
          <TabsTrigger value="nightmare-challenges">
            Nightmare Challenges
          </TabsTrigger>
          <TabsTrigger value="hardcore-challenges">
            Hardcore Challenges
          </TabsTrigger>
        </TabsList>
        <TabsContent value="save-slots">
          <AccountSlots />
        </TabsContent>
        <TabsContent value="nightmare-challenges">
          <AccountChallenges type="Nightmare" />
        </TabsContent>
        <TabsContent value="hardcore-challenges">
          <AccountChallenges type="Hardcore" />
        </TabsContent>
      </Tabs>
    </>
  );
};
