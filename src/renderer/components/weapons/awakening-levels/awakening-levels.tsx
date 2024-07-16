import { useSaveContext } from '@/src/renderer/context/context';
import { useCallback } from 'react';
import { SaveData } from '@/src/renderer/saveFileTypes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AwakeningLevelCard } from './awakening-level-card/awakening-level-card';

export const WeaponAwakeningLevels = () => {
  const { saveStructure, saveNewValues } = useSaveContext();

  const awakeningHandlers =
    saveStructure?.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons;

  const onAwakeningLevelSave = useCallback(
    (handlerKey: string, awakeningLevel: number) => {
      const newStructure = JSON.parse(
        JSON.stringify(saveStructure),
      ) as SaveData;

      const existingHandler =
        newStructure.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons.find(
          (handler) => handler.awakenedWeaponHandle.rowName === handlerKey,
        )!;

      existingHandler.awakeningLevel = awakeningLevel;

      saveNewValues(newStructure);
    },
    [saveNewValues, saveStructure],
  );

  return (
    <div className="flex flex-col max-h-full">
      <div className="flex flex-wrap gap-5 h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
        <Alert className="flex flex-col text-center">
          <AlertTitle>Note:</AlertTitle>
          <AlertDescription>
            Awakening entries only appear for owned weapons.
          </AlertDescription>
        </Alert>
        {awakeningHandlers?.map((handler) => (
          <AwakeningLevelCard handler={handler} onSave={onAwakeningLevelSave} />
        ))}
      </div>
    </div>
  );
};
