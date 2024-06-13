import { useCallback, useContext, useMemo, useState } from 'react';
import { SaveEditorContext } from '../../context/context';
import { ECHOS, ECHO_DATA } from '../../tables/echos';
import { EchoRarity, MNonFungibleItem, SaveData } from '../../saveFileTypes';
import { Button } from '@/components/ui/button';
import { EditEchoDialog } from './edit-echo/edit-echo';
import { EchoCard } from './echo-card/echo-card';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { NON_FUNGIBLE_ITEM_STRUCTURE } from '../../structures/structures';
import { v4 as uuidv4 } from 'uuid';

export type InventoryEchoType = MNonFungibleItem & {
  rawEchoData: (typeof ECHOS)[0];
};

export type EssentialEchoData = {
  id?: string;
  key: string;
  rarity: EchoRarity;
  currentXP: number;
  icon: string;
  name: string;
};

export const Echos = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  // Enable Add Mode
  const [isAddMode, setIsAddMode] = useState(false);

  // Sets Selected Echo
  const [selectedEcho, setSelectedEcho] = useState<EssentialEchoData>();

  const echoList = useMemo(() => {
    if (isAddMode) {
      return ECHOS.reduce<EssentialEchoData[]>((acc, echo) => {
        acc.push({
          key: echo.key,
          rarity: EchoRarity.Common,
          currentXP: 0,
          icon: echo.icon,
          name: echo.localizedString ?? 'N/A',
        });

        return acc;
      }, []);
    } else {
      return saveStructure?.playerData?.m_InventoryData.m_NonFungibleItems
        .reduce<EssentialEchoData[]>((acc, item) => {
          const matchingEcho = ECHOS.find((echo) => echo.key === item.name);
          if (matchingEcho)
            acc.push({
              id: item.iD,
              key: matchingEcho.key,
              rarity: item.spec.itemSpec.echoRarity,
              currentXP: item.spec.itemSpec.currentExp,
              icon: matchingEcho.icon,
              name: matchingEcho.localizedString ?? 'N/A',
            });
          return acc;
        }, [])
        .reverse();
    }
  }, [saveStructure, isAddMode]);

  const onSaveHandle = useCallback((values: any) => {
    const hasId = !!values.id;

    const newStructure = { ...saveStructure } as SaveData;

    /**
     * Set New XP
     */
    const initialXP = ECHO_DATA[values.rarity as EchoRarity].initialXP;
    const currentExp =
      values.level === 1 ? 0 : initialXP + 54 * Math.max(0, values.level - 2);

    if (hasId) {
      const newEcho =
        newStructure.playerData.m_InventoryData.m_NonFungibleItems.find(
          (item) => item.iD === values.id,
        ) as MNonFungibleItem;

      newEcho.spec.itemSpec.currentExp = currentExp;
      newEcho.spec.itemSpec.echoRarity = values.rarity as EchoRarity;
    } else {
      const newEcho = {
        ...NON_FUNGIBLE_ITEM_STRUCTURE,
        name: values.key,
        iD: uuidv4()
          .replace(/-/g, '')
          .replace(/[a-zA-Z]/g, (match) => match.toUpperCase()),
      };

      newEcho.spec.itemSpec.initialSeed = Math.floor(
        1000000000 + Math.random() * 5000000000,
      );

      newEcho.spec.itemSpec.randomSeeds = [
        {
          name: 'FogSoul',
          seed: Math.floor(1000000000 + Math.random() * 5000000000),
        },
      ] as any;

      newEcho.spec.itemSpec.currentExp = currentExp;
      newEcho.spec.itemSpec.echoRarity = values.rarity as EchoRarity;

      newStructure.playerData.m_InventoryData.m_NonFungibleItems.push(
        newEcho as MNonFungibleItem,
      );
    }

    saveNewValues(newStructure);
    setSelectedEcho(undefined);
    setIsAddMode(false);
  }, []);

  return (
    <div className="flex flex-wrap gap-5 h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
      {selectedEcho && (
        <EditEchoDialog
          echo={selectedEcho}
          onSave={onSaveHandle}
          onClose={() => setSelectedEcho(undefined)}
        />
      )}
      {/*
        Mode Management Card:
          - Controls if we are seeing existing echos or adding a new one
      */}
      <Card className="relative w-[150px] m-h-[240px] flex flex-col items-center p-0 border-[2px] border-dashed border-accent shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]">
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
                  <span>Back To Owned Echos</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  Add Echo
                </>
              )}
            </CardTitle>
          </CardHeader>
        </Button>
      </Card>

      {/* Echo List */}
      {echoList?.map((echo) => (
        <EchoCard key={echo.id ?? echo.key} echo={echo}>
          <Button
            className="w-full min-h-[50px] mb-[-13px] rounded-lg rounded-tl-none rounded-tr-none"
            type="submit"
            onClick={() => setSelectedEcho(echo)}
          >
            {isAddMode ? 'Add' : 'Edit'}
          </Button>
        </EchoCard>
      ))}
    </div>
  );
};
