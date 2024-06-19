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
  NON_FUNGIBLE_ITEM_STRUCTURE,
} from '../../structures/structures';
import { ItemCard } from '../item-card/item-card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { generateSeed, generateUniqueID } from '../../utils';

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

export const InventoryItemField = ({ form, item }: InventoryItemField) => {
  return (
    <FormField
      control={form.control}
      name={item.key}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ItemCard item={item}>
              {typeof field.value === 'boolean' ? (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              ) : (
                <Input {...field} />
              )}
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

const isArmorTypeItem = (item: INVENTORY_ITEM) => {
  return (
    item.equipmentSlot?.startsWith('EEquipmentSlotType::COSMETIC') ||
    item.equipmentSlot?.startsWith('EEquipmentSlotType::ARMOR') ||
    item.equipmentSlot?.startsWith('EEquipmentSlotType::PERSONA')
  );
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
    const [fungibleItems, nonFungibleItems] = dataSet.reduce(
      (acc, i) => {
        if (i.bIsFungible) acc[0].push(i);
        else {
          if (values[i.key]) {
            for (const addItem of i.addItemsWhenCreated ?? []) {
              acc[1].push({
                ...i,
                key: addItem.rowName,
                data: addItem,
                equipmentSlot:
                  i.equipmentSlot === 'EEquipmentSlotType::WEAPON'
                    ? 'EEquipmentSlotType::WEAPON_GLAMOUR'
                    : 'EEquipmentSlotType::ARMOR_GLAMOUR',
              } as any);
            }
            acc[1].push(i);
          }
        }

        return acc;
      },
      [[] as INVENTORY_ITEM[], [] as INVENTORY_ITEM[]],
    );

    if (!saveStructure?.playerData) return;

    const newSaveData = { ...saveStructure };

    if (fungibleItems.length) {
      const currentFungibleItems =
        saveStructure?.playerData?.m_InventoryData.m_FungibleItems;

      const unrelatedItems = currentFungibleItems.filter(
        (fi) => values[fi.name] === undefined,
      );

      const newEntries = fungibleItems
        .filter((item) => values[item.key])
        .map((item) => ({
          ...FUNGIBLE_ITEM_STRUCTURE,
          name: item.key,
          count: values[item.key],
        }));

      const newFungibleItems = [
        ...unrelatedItems,
        ...newEntries,
      ] as MFungibleItem[];

      if (newSaveData.playerData)
        newSaveData.playerData.m_InventoryData.m_FungibleItems =
          newFungibleItems;
    }

    if (nonFungibleItems.length) {
      const currentNonFungibleItems = [
        ...saveStructure?.playerData?.m_InventoryData.m_NonFungibleItems,
      ];

      const currentWeaponGlamours = [
        ...saveStructure?.playerData?.m_InventoryData.m_WeaponGlamours,
      ];

      const currentArmorGlamours = [
        ...saveStructure?.playerData?.m_InventoryData.m_ArmorGlamours,
      ];

      const currentAwakenedWeapons = [
        ...saveStructure?.playerData?.m_AwakenedWeaponsData.m_AwakenedWeapons,
      ];

      /**
       * Handle Non Fungible Item Section
       */

      for (const item of nonFungibleItems) {
        // Only mess with wepaons if adding a new one. Removing/Managing weapons will come later on its own component
        if (item.equipmentSlot === 'EEquipmentSlotType::WEAPON_GLAMOUR') {
          // Check if it exists in WeaponGlamours & add
          const hasWeaponGlamour = !!currentWeaponGlamours.find(
            (ci) => ci.rowName === item.key,
          );
          if (!hasWeaponGlamour) currentWeaponGlamours.push(item.data as any);
        }
        if (item.equipmentSlot === 'EEquipmentSlotType::WEAPON') {
          // Check if it exists in AwakenedWeapons & add
          const hasWAwakenedWeapon = !!currentAwakenedWeapons.find(
            (ci) => ci.awakenedWeaponHandle.rowName === item.key,
          );
          if (!hasWAwakenedWeapon)
            currentWeaponGlamours.push({
              awakenedWeaponHandle: item.data,
              awakeningLevel: 0,
            } as any);
        }

        if (isArmorTypeItem(item)) {
          // Check if it exists inArmorGlamours & add/remove
          const hasArmourGlamour = !!currentArmorGlamours.find(
            (ci) => ci.rowName === item.key,
          );
          if (!hasArmourGlamour) currentArmorGlamours.push(item.data as any);
        }

        // Check if it exists in NonFungibleItems & add/remove
        const matchingNonFungibleItem = currentNonFungibleItems.find(
          (ci) => ci.name === item.key,
        );
        const hasNonFungibleItem = !!matchingNonFungibleItem;

        if (!hasNonFungibleItem) {
          const template = {
            ...JSON.parse(JSON.stringify(NON_FUNGIBLE_ITEM_STRUCTURE)),
          };
          template.name = item.key;
          template.iD = generateUniqueID();
          template.spec.itemSpec.initialSeed = generateSeed();

          if (isArmorTypeItem(item)) template.spec.itemSpec.itemFlags = 8;

          currentNonFungibleItems.push(template as MNonFungibleItem);
        }
        // Amends armor itemFlags. Still studying the effects of this, but most armor types have this value, so may aswell.
        else if (
          hasNonFungibleItem &&
          isArmorTypeItem(item) &&
          matchingNonFungibleItem.spec.itemSpec.itemFlags !== 8
        ) {
          matchingNonFungibleItem.spec.itemSpec.itemFlags = 8;
        }

        if (newSaveData.playerData) {
          newSaveData.playerData.m_InventoryData.m_NonFungibleItems =
            currentNonFungibleItems;

          newSaveData.playerData.m_InventoryData.m_ArmorGlamours =
            currentArmorGlamours;
          newSaveData.playerData.m_InventoryData.m_WeaponGlamours =
            currentWeaponGlamours;
          newSaveData.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons =
            currentAwakenedWeapons;
        }
      }
    }

    saveNewValues(newSaveData);
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
