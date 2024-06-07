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
import { InventoryItemField } from '../forms/inventory-form';
import { INVENTORY_ITEM } from '../../structures/structures';

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

  const data = [
    {
      key: 'experience',
      localizedString: 'Reward Tower Experience',
      icon: 'Icons/Currency/icoon_currency_XP_01',
    },
    {
      key: 'keys',
      localizedString: 'Reward Tower Keys',
      icon: 'Icons/Currency/icon_currency_BattlePassKey',
    },
  ] as any;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-h-full h-full"
      >
        <div className="flex flex-wrap items-center gap-5 h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
          {/* Experience Field */}
          <InventoryItemField form={form as any} item={data[0]} />

          {/* Experience Field */}
          <InventoryItemField form={form as any} item={data[1]} />
        </div>
        <Button className="w-full h-[50px] rounded-none" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
