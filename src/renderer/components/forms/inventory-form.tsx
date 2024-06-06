import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';
import { SaveEditorContext } from '../../context/context';
import { MFungibleItem, MNonFungibleItem, SaveData } from '../../saveFileTypes';
import {
  FUNGIBLE_ITEM_STRUCTURE,
  INVENTORY_ITEM,
} from '../../structures/structures';
import { ItemCard } from '../item-card/item-card';
import { Input } from '@/components/ui/input';

const generateSchema = (dataSet: INVENTORY_ITEM[]) =>
  dataSet.reduce((acc, item) => {
    if (item.bIsFungible)
      acc[item.key] = z.coerce.number().min(0, {
        message: 'Minimum number is 0',
      });
    else acc[item.key] = z.boolean().optional().default(false);
    return acc;
  }, {} as any);

const generateDefaultValues = (
  items: INVENTORY_ITEM[],
  saveStructure: SaveData | undefined,
) => {
  return items.reduce((acc, item) => {
    const existingFungibleItems = saveStructure?.playerData?.m_InventoryData
      .m_FungibleItems as MFungibleItem[];

    const existingNonFungibleItems = saveStructure?.playerData?.m_InventoryData
      .m_NonFungibleItems as MNonFungibleItem[];

    if (item.bIsFungible) {
      acc[item.key] =
        existingFungibleItems.find((fi) => fi.name === item.key)?.count || 0;
    } else {
      acc[item.key] = !!existingNonFungibleItems.find(
        (fi) => fi.name === item.key,
      );
    }

    return acc;
  }, {} as any);
};

type FormType = UseFormReturn<
  {
    [x: string]: any;
  },
  any,
  undefined
>;

type InventoryItemField = {
  form: FormType;
  item: INVENTORY_ITEM;
};

const InventoryItemField = ({ form, item }: InventoryItemField) => {
  return (
    <FormField
      control={form.control}
      name={item.key}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ItemCard item={item}>
              <Input {...field} />
            </ItemCard>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export type InventoryFormProps = {
  dataSet: INVENTORY_ITEM[];
};

export const InventoryForm = ({ dataSet }: InventoryFormProps) => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  const formSchema = useMemo(() => {
    return z.object(generateSchema(dataSet));
  }, [saveStructure]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(dataSet, saveStructure),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    debugger;
    let newFungibleItems = [];

    if (saveStructure?.playerData) {
      const fungibleItems = saveStructure?.playerData?.m_InventoryData
        .m_FungibleItems as MFungibleItem[];
      const unrelatedItems = fungibleItems.filter((fi) => !values[fi.name]);
      const newEntries = Object.entries(values).map(([k, v]) => ({
        ...FUNGIBLE_ITEM_STRUCTURE,
        name: k,
        count: v,
      }));

      const newFungibleItems = [...unrelatedItems, ...newEntries];

      const newSaveData = { ...saveStructure };
      if (newSaveData.playerData)
        newSaveData.playerData.m_InventoryData.m_FungibleItems =
          newFungibleItems;

      saveNewValues(newSaveData);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-h-full"
      >
        <div className="flex flex-wrap gap-5 h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
          {dataSet.map((c) => {
            return <InventoryItemField key={c.key} form={form} item={c} />;
          })}
        </div>
        <Button className="w-full min-h-[50px] rounded-none mt-4" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
