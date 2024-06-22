import { useContext, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { SaveEditorContext } from '@/src/renderer/context/context';
import { HOUSING_ITEMS } from '@/src/renderer/tables/housing';
import { ItemCard } from './item-card/item-card';
import { MNonFungibleItem, SaveData } from '@/src/renderer/saveFileTypes';
import { NON_FUNGIBLE_ITEM_STRUCTURE } from '@/src/renderer/structures/structures';
import { generateSeed, generateUniqueID } from '@/src/renderer/utils';

export type EssentialItemData = {
  id?: string;
  key: string;
  icon: string;
  name: string;
};

export const HousingTab = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  // Enable Add Mode
  const [isAddMode, setIsAddMode] = useState(false);

  const itemList = useMemo(() => {
    if (isAddMode) {
      return HOUSING_ITEMS.reduce<EssentialItemData[]>((acc, houseItem) => {
        acc.push({
          key: houseItem.key,
          icon: houseItem.icon,
          name: houseItem.localizedString ?? 'N/A',
        });

        return acc;
      }, []).sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return saveStructure?.playerData?.m_InventoryData.m_NonFungibleItems
        .reduce<EssentialItemData[]>((acc, item) => {
          const matchingItem = HOUSING_ITEMS.find(
            (nfi) => nfi.key === item.name,
          );
          if (matchingItem) {
            acc.push({
              id: item.iD,
              key: matchingItem.key,
              icon: matchingItem.icon,
              name: matchingItem.localizedString ?? 'N/A',
            });
          }
          return acc;
        }, [])
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [saveStructure, isAddMode]);

  const onAddItemHandler = (value: number, itemKey: string) => {
    const newStructure = JSON.parse(JSON.stringify(saveStructure)) as SaveData;

    for (let i = 0; i < value; i++) {
      const newItem = {
        ...JSON.parse(JSON.stringify(NON_FUNGIBLE_ITEM_STRUCTURE)),
        name: itemKey,
        iD: generateUniqueID(),
      } as MNonFungibleItem;
      newItem.spec.itemSpec.initialSeed = generateSeed();

      newStructure.playerData.m_InventoryData.m_NonFungibleItems.push(newItem);
    }

    saveNewValues(newStructure);
    setIsAddMode(false);
  };

  return (
    <div className="flex flex-wrap gap-5 max-h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
      <Card className="relative w-[150px] min-h-[240px] flex flex-col items-center p-0 border-[2px] border-dashed border-accent shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]">
        <Button
          variant="ghost"
          className="flex items-center text-center justify-center flex-1 p-0 w-full"
          onClick={() => setIsAddMode((state) => !state)}
        >
          <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
            <CardTitle className="flex flex-col items-center gap-2 text-md/[18px] text-wrap">
              {isAddMode ? (
                <>
                  <ArrowLeftIcon />
                  <span>Back To Owned Housing Items</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  Add Housing Item
                </>
              )}
            </CardTitle>
          </CardHeader>
        </Button>
      </Card>

      {/* Echo List */}
      {itemList?.map((item) => (
        <ItemCard
          key={item.id ?? item.key}
          item={item}
          onAdd={onAddItemHandler}
        />
      ))}
    </div>
  );
};
