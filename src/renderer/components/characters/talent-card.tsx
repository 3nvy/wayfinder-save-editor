import {
  Card,
  CardDescription,
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
import { TalentItem } from '@/src/renderer/saveFileTypes';
import { ComponentProps, useCallback } from 'react';
import { useSaveContext } from '@/src/renderer/context/context';
import { AbilitiesInfo, AspectInfo } from '../../curves/character-level-curve';

type TalentCardProps = ComponentProps<typeof Card> & {
  talent: TalentItem;
  characterName: string;
  onTalentChange: (
    character: string,
    talentName: string,
    points: number,
  ) => void;
};

export const TalentCard = ({
  talent,
  characterName,
  onTalentChange,
}: TalentCardProps) => {
  const { assetsPath } = useSaveContext();

  const talentName = talent.talentItem.data.rowName;

  const icon = talentName.includes('Aspect')
    ? AspectInfo[talentName.split('_')[1] as keyof AspectInfo].icon
    : AbilitiesInfo[talentName]?.icon;

  const name = talentName.includes('Aspect')
    ? AspectInfo[talentName.split('_')[1] as keyof AspectInfo].name
    : AbilitiesInfo[talentName]?.name;

  const handlePointsChange = useCallback(
    (val: string) => {
      onTalentChange(characterName, talentName, +val);
    },
    [characterName, onTalentChange, talentName],
  );

  return (
    <Card className="relative w-[150px] min-h-[250px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]">
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        <img
          className="rounded-full p-[5px]"
          src={`file://${assetsPath}/${icon}.png`}
          width={60}
          alt="ptara"
        />
        <CardTitle className="text-md/[18px]">{name}</CardTitle>
        <CardDescription className="flex flex-col gap-3">
          <span>Points</span>
          <Select
            defaultValue={`${talent.numPointsSpent}`}
            value={`${talent.numPointsSpent}`}
            onValueChange={handlePointsChange}
          >
            <SelectTrigger className="min-w-[100px]">
              <SelectValue placeholder="Select Awakening Level" />
            </SelectTrigger>
            <SelectContent>
              {Array(talent.talentItem.data.rowName.includes('Aspect') ? 26 : 4)
                .fill(0)
                .map((_, idx) => (
                  <SelectItem value={`${idx}`}>{`${idx}`}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
