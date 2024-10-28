import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MAwakenedWeapon } from '@/src/renderer/saveFileTypes';
import { WEAPONS } from '@/src/renderer/tables/weapons/weapons';
import { ComponentProps, useMemo, useState } from 'react';
import { useSaveContext } from '@/src/renderer/context/context';
import { Button } from '@/components/ui/button';

type AwakeningLevelCardProps = ComponentProps<typeof Card> & {
  handler: MAwakenedWeapon;
  onSave: (handlerKey: string, awakeningLevel: number) => void;
};

export const AwakeningLevelCard = ({
  handler,
  onSave,
}: AwakeningLevelCardProps) => {
  const { assetsPath } = useSaveContext();
  const [currentAwakeningLevel, setCurrentAwakeningLevel] = useState(
    handler.awakeningLevel,
  );

  const weaponEntry = useMemo(() => {
    return WEAPONS.find(
      (weapon) => weapon.key === handler.awakenedWeaponHandle.rowName,
    );
  }, [handler.awakenedWeaponHandle.rowName])!;

  return (
    <Card className="relative w-[150px] min-h-[250px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]">
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        <img
          className="rounded-full p-[5px]"
          src={`file://${assetsPath}/${weaponEntry.icon}.png`}
          width={60}
          alt={weaponEntry.localizedString}
        />
        <CardTitle className="text-md/[18px]">
          {weaponEntry.localizedString}
        </CardTitle>
        <CardDescription className="flex flex-col gap-3">
          <span>Awakening Level</span>
          <Select
            defaultValue={`${currentAwakeningLevel}`}
            value={`${currentAwakeningLevel}`}
            onValueChange={(value) => setCurrentAwakeningLevel(+value)}
          >
            <SelectTrigger className="min-w-[100px]">
              <SelectValue placeholder="Select Awakening Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full p-0">
        <Button
          className="w-full min-h-[50px] mb-[-13px] rounded-lg rounded-tl-none rounded-tr-none"
          type="button"
          onClick={() => {
            onSave(handler.awakenedWeaponHandle.rowName, currentAwakeningLevel);
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};
