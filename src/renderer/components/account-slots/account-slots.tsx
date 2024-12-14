import { useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSaveContext } from '../../context/context';

export const AccountSlots = () => {
  const { saveStructure }: any = useSaveContext();

  const saveSlotData = useMemo(() => {
    return saveStructure.SaveProfiles.Properties.filter(
      (slot: any) => slot.Properties[3].Property[1] > 1,
    ).map((slot: any, idx: number) => ({
      idx,
      name: `WayfinderSave${idx}_${slot.Properties[1].Property[1]}.sav`,
    }));
  }, [saveStructure.SaveProfiles.Properties]);

  return (
    <div className="flex flex-col max-h-full gap-10">
      {saveSlotData.map((slot: any) => (
        <Alert>
          <AlertTitle>Slot number {slot.idx + 1}</AlertTitle>
          <AlertDescription>{slot.name}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
