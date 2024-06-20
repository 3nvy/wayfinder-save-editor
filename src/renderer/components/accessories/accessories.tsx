import { useCallback, useContext, useMemo, useState } from 'react';
import { SaveEditorContext } from '../../context/context';
import { Button } from '@/components/ui/button';
import { AccessoryCard } from './accessory-card/accessory-card';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { ACCESSORIES } from '../../tables/accessories';
import { EditAccessoryDialog } from './edit-accessory/edit-accessory';
import { MNonFungibleItem, SaveData } from '../../saveFileTypes';
import { NON_FUNGIBLE_ITEM_STRUCTURE } from '../../structures/structures';
import { generateSeed, generateUniqueID } from '../../utils';

export type EssentialAccessoryData = {
  id?: string;
  key: string;
  attributes: string[];
  currentXP: number;
  startingExp: number;
  icon: string;
  name: string;
};

export const Accessories = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  // Enable Add Mode
  const [isAddMode, setIsAddMode] = useState(false);

  // Sets Selected Echo
  const [selectedAccessory, setSelectedAccessory] =
    useState<EssentialAccessoryData>();

  const accessoriesList = useMemo(() => {
    if (isAddMode) {
      return ACCESSORIES.reduce<EssentialAccessoryData[]>((acc, accessory) => {
        acc.push({
          key: accessory.key,
          currentXP: 0,
          startingExp: 0,
          icon: accessory.icon,
          name: accessory.localizedString ?? 'N/A',
          attributes: accessory.equipmentData.attributes,
        });

        return acc;
      }, []).sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return saveStructure?.playerData?.m_InventoryData.m_NonFungibleItems
        .reduce<EssentialAccessoryData[]>((acc, item) => {
          const matchinAccessory = ACCESSORIES.find(
            (echo) => echo.key === item.name,
          );
          if (matchinAccessory)
            acc.push({
              id: item.iD,
              key: matchinAccessory.key,
              currentXP: item.spec.itemSpec.currentExp,
              startingExp: item.spec.itemSpec.startingExp,
              icon: matchinAccessory.icon,
              name: matchinAccessory.localizedString ?? 'N/A',
              attributes: matchinAccessory.equipmentData.attributes,
            });
          return acc;
        }, [])
        .reverse();
    }
  }, [saveStructure, isAddMode]);

  const onSaveHandle = useCallback((values: any) => {
    const hasId = !!values.id;

    const newStructure = { ...saveStructure } as SaveData;

    if (hasId) {
      const matchingAccessory =
        newStructure.playerData.m_InventoryData.m_NonFungibleItems.find(
          (item) => item.iD === values.id,
        ) as MNonFungibleItem;

      matchingAccessory.spec.itemSpec.currentExp = values.level - 1;
      matchingAccessory.spec.itemSpec.startingExp = values.level - 1;
    } else {
      const newAccessory = {
        ...JSON.parse(JSON.stringify(NON_FUNGIBLE_ITEM_STRUCTURE)),
        name: values.key,
        iD: generateUniqueID(),
      };

      newAccessory.spec.itemSpec.initialSeed = generateSeed();

      newStructure.playerData.m_InventoryData.m_NonFungibleItems.push(
        newAccessory as MNonFungibleItem,
      );
    }

    saveNewValues(newStructure);
    setSelectedAccessory(undefined);
    setIsAddMode(false);
  }, []);

  return (
    <div className="flex flex-wrap gap-5 max-h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
      {selectedAccessory && (
        <EditAccessoryDialog
          accessory={selectedAccessory}
          onSave={onSaveHandle}
          onClose={() => setSelectedAccessory(undefined)}
        />
      )}
      {/*
        Mode Management Card:
          - Controls if we are seeing existing echos or adding a new one
      */}
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
                  <span>Back To Owned Accessories</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  Add Accessory
                </>
              )}
            </CardTitle>
          </CardHeader>
        </Button>
      </Card>

      {/* Echo List */}
      {accessoriesList?.map((accessory) => (
        <AccessoryCard
          key={accessory.id ?? accessory.key}
          accessory={accessory}
        >
          <Button
            className="w-full min-h-[50px] mb-[-13px] rounded-lg rounded-tl-none rounded-tr-none"
            type="submit"
            onClick={() => setSelectedAccessory(accessory)}
          >
            {isAddMode ? 'Add' : 'Edit'}
          </Button>
        </AccessoryCard>
      ))}
    </div>
  );
};
