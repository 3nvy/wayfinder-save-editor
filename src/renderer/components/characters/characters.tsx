import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSaveContext } from '../../context/context';
import {
  CharacterInfo,
  WayfinderRankLevelCurve,
} from '../../curves/character-level-curve';
import { TalentCard } from './talent-card';
import { MNonFungibleItem, SaveData } from '../../saveFileTypes';

const expToRankLevel = (exp: number) => {
  const levelCurveNumber = WayfinderRankLevelCurve.reduce(
    (acc, levelExp, idx) => {
      if (levelExp <= exp) {
        return idx;
      }
      return acc;
    },
    0,
  );

  return levelCurveNumber;
};

const rankLevelToExp = (level: number) => {
  return WayfinderRankLevelCurve[level];
};

export const Characters = () => {
  const { assetsPath, saveStructure, saveNewValues } = useSaveContext();

  const characters = Object.keys(CharacterInfo);

  const [currentWayfinderRank, setCurrentWayfinderRank] = useState(() =>
    expToRankLevel(
      saveStructure?.playerData.m_WayfinderRankData.m_WayfinderExperience ?? 0,
    ),
  );

  const [charactersData, setCharactersData] = useState<MNonFungibleItem[]>(
    () => {
      const data =
        saveStructure?.playerData.m_InventoryData.m_NonFungibleItems.filter(
          (item) => characters.includes(item.name),
        );
      return JSON.parse(JSON.stringify(data)) as MNonFungibleItem[];
    },
  );

  const onTalentChange = useCallback(
    (character: string, talent: string, points: number) => {
      setCharactersData((current) => {
        const characterEntry = current.find(
          (entry) => entry.name === character,
        )!;

        const talentEntry = characterEntry.spec.itemSpec.talentItems.find(
          (t) => t.talentItem.data.rowName === talent,
        )!;

        talentEntry.numPointsSpent = points;

        return [...current];
      });
    },
    [],
  );

  const onSaveChanges = useCallback(() => {
    const newSaveData = JSON.parse(JSON.stringify(saveStructure)) as SaveData;

    const newNonFungibleItems =
      newSaveData.playerData.m_InventoryData.m_NonFungibleItems.map((item) => {
        const characterEntry = charactersData.find(
          (cd) => cd.name === item.name,
        );

        // Save WayfinderRank Data
        newSaveData.playerData.m_WayfinderRankData.m_WayfinderExperience =
          rankLevelToExp(currentWayfinderRank);
        newSaveData.header.wayfinderRank = currentWayfinderRank;

        // Save Wayfinder Data
        if (characterEntry) {
          for (const talent of characterEntry.spec.itemSpec.talentItems) {
            const talentEntry =
              newSaveData.playerData.m_InventoryData.m_NonFungibleItems.find(
                (tItem) => tItem.iD === talent.talentItem.iD,
              )!;
            talentEntry.spec.itemSpec.currentExp = talent.numPointsSpent;
          }
        }

        return characterEntry ?? item;
      });
    newSaveData.playerData.m_InventoryData.m_NonFungibleItems =
      newNonFungibleItems;

    saveNewValues(newSaveData);
  }, [charactersData, currentWayfinderRank, saveNewValues, saveStructure]);

  return (
    <div className="flex flex-col max-h-full">
      <Label htmlFor="wayfinderRank">Wayfinder Rank</Label>
      <Select
        name="wayfinderRank"
        onValueChange={(val) => setCurrentWayfinderRank(+val)}
        defaultValue={`${currentWayfinderRank}`}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select desired rarity for echo" />
        </SelectTrigger>
        <SelectContent>
          {Array(31)
            .fill(1)
            .map((_, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <SelectItem key={idx} value={`${idx}`}>
                {`${idx}`}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Separator className="my-4" />

      <div className="flex flex-col items-center overflow-auto">
        {charactersData?.map((character) => (
          <>
            <div className="flex flex-wrap gap-[25px]">
              <img
                className="w-[150px] h-[150px]"
                src={`file://${assetsPath}/${CharacterInfo[character.name]?.icon}.png`}
                alt={character.name}
              />
              {character.spec.itemSpec.talentItems.map((talent) => (
                <TalentCard
                  key={talent.talentItem.iD}
                  characterName={character.name}
                  talent={talent}
                  onTalentChange={onTalentChange}
                />
              ))}
            </div>
            <Separator className="my-4" />
          </>
        ))}
      </div>
      <Button
        className="w-full min-h-[50px] rounded-none mt-4"
        onClick={onSaveChanges}
      >
        Save
      </Button>
    </div>
  );
};
