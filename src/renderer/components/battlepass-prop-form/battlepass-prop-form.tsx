import { useContext, useMemo } from 'react';
import { SaveEditorContext } from '../../context/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MBattlePassDataV2 } from '../../saveFileTypes';
import { Input } from '@/components/ui/input';

export const BattlePassPropForm = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  const battlePassData = saveStructure?.playerData
    ?.m_BattlePassDataV2 as MBattlePassDataV2;

  const formSchema = useMemo(() => {
    return z.object({
      experience: z.coerce.number().min(0),
      keys: z.coerce.number().min(0),
    });
  }, [saveStructure]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: battlePassData.m_Progression.m_progress.m_Experience,
      keys: battlePassData.m_Progression.m_progress.m_Keys,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (saveStructure?.playerData) {
      battlePassData.m_Progression.m_progress.m_Experience = values.experience;
      battlePassData.m_Progression.m_progress.m_Keys = values.keys;

      const newSaveData = { ...saveStructure };
      if (newSaveData.playerData)
        newSaveData.playerData.m_BattlePassDataV2 = battlePassData;

      saveNewValues(newSaveData);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex w-full h-full space-y-8 flex-col"
      >
        {/* Experience Field */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward Tower Experience</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience Field */}
        <FormField
          control={form.control}
          name="keys"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward Tower Keys</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full h-[50px] rounded-none" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
