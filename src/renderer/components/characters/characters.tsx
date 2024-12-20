import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Fragment, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LockIcon } from 'lucide-react';
import { useSaveContext } from '../../context/context';
import {
  CharacterInfo,
  CharacterLevelCurve,
  WayfinderRankLevelCurve,
} from '../../curves/character-level-curve';
import { TalentCard } from './talent-card';
import { MNonFungibleItem, SaveData } from '../../saveFileTypes';
import { ArchetypeTree } from './archetype-tree';

const expToRankLevel = (exp: number, curveObject: number[]) => {
  const levelCurveNumber = curveObject.reduce((acc, levelExp, idx) => {
    if (levelExp <= exp) {
      return idx;
    }
    return acc;
  }, 0);

  return levelCurveNumber;
};

const rankLevelToExp = (level: number, curveObject: number[]) => {
  return curveObject[level];
};

const difficulties = ['Story', 'Normal', 'Challenging', 'Heroic', 'Nightmare'];

export const Characters = () => {
  const [selectedCharacterArchetype, setSelectedCharacterArchetype] =
    useState<string>();

  const { assetsPath, saveStructure, saveNewValues } = useSaveContext();

  const characters = Object.keys(CharacterInfo);

  const [currentWayfinderRank, setCurrentWayfinderRank] = useState(() =>
    expToRankLevel(
      saveStructure?.playerData.m_WayfinderRankData.m_WayfinderExperience ?? 0,
      WayfinderRankLevelCurve,
    ),
  );

  const [currentDifficulty, setCurrentDifficulty] = useState(
    saveStructure?.header?.difficulty ?? 'Story',
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

  // Updates assigned points for characters talent entries
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

  const onWayfinderLevelChange = useCallback(
    (character: string, level: number) => {
      setCharactersData((current) => {
        const newItems = current.map((item) => {
          if (item.name === character) {
            item.spec.itemSpec.currentExp = rankLevelToExp(
              level,
              CharacterLevelCurve,
            );
          }
          return item;
        });
        return [...newItems];
      });
    },
    [],
  );

  const onSaveChanges = useCallback(() => {
    const newSaveData = JSON.parse(JSON.stringify(saveStructure)) as SaveData;

    // Save Difficulty
    newSaveData.header.difficulty = currentDifficulty;

    // Save WayfinderRank Data
    newSaveData.playerData.m_WayfinderRankData.m_WayfinderExperience =
      rankLevelToExp(currentWayfinderRank, WayfinderRankLevelCurve);
    newSaveData.header.wayfinderRank = currentWayfinderRank;

    const newNonFungibleItems =
      newSaveData.playerData.m_InventoryData.m_NonFungibleItems.map((item) => {
        const characterEntry = charactersData.find(
          (cd) => cd.name === item.name,
        );

        /**
         * Affinities and Abilities have their own separate entries that need to be updated
         * So this finds them based on their IDs and syncs the points
         */
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
  }, [
    charactersData,
    currentDifficulty,
    currentWayfinderRank,
    saveNewValues,
    saveStructure,
  ]);

  return (
    <div className="flex flex-col max-h-full">
      {selectedCharacterArchetype ? (
        <ArchetypeTree
          character={selectedCharacterArchetype}
          onClose={() => setSelectedCharacterArchetype(undefined)}
        />
      ) : (
        <>
          <div className="flex justify-center items-center gap-7">
            <div className="flex items-center mt-3 gap-3">
              <Label htmlFor="wayfinderRank">Wayfinder Rank</Label>
              <Select
                name="wayfinderRank"
                onValueChange={(val) => setCurrentWayfinderRank(+val)}
                defaultValue={`${currentWayfinderRank}`}
              >
                <SelectTrigger className="w-[125px]">
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
            </div>

            <div className="flex justify-center items-center mt-3 gap-3">
              <Label htmlFor="wayfinderRank">Difficulty</Label>
              <Select
                name="difficulty"
                onValueChange={setCurrentDifficulty}
                defaultValue={currentDifficulty}
              >
                <SelectTrigger className="w-[125px]">
                  <SelectValue placeholder="Select desired rarity for echo" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col items-center overflow-auto">
            {characters?.map((characterID) => {
              const characterEntry = charactersData.find(
                (character) => character.name === characterID,
              );
              const characterInfo =
                CharacterInfo[characterID as keyof typeof CharacterInfo];
              return (
                <Fragment key={characterID}>
                  <div className="flex flex-wrap gap-[25px] items-center">
                    <div className="flex flex-col gap-2">
                      <img
                        className="w-[150px] h-[150px]"
                        src={`file://${assetsPath}/${characterInfo?.icon}.png`}
                        alt={characterInfo.name}
                      />
                      {characterEntry && (
                        <>
                          <Select
                            defaultValue={`${expToRankLevel(
                              characterEntry.spec.itemSpec.currentExp,
                              CharacterLevelCurve,
                            )}`}
                            value={`${expToRankLevel(
                              characterEntry.spec.itemSpec.currentExp,
                              CharacterLevelCurve,
                            )}`}
                            onValueChange={(level) =>
                              onWayfinderLevelChange(
                                characterEntry.name,
                                +level,
                              )
                            }
                          >
                            <SelectTrigger className="min-w-[100px]">
                              <SelectValue placeholder="Select Awakening Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array(30)
                                .fill(0)
                                .map((_, idx) => (
                                  <SelectItem
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={idx}
                                    value={`${idx}`}
                                  >{`${idx + 1}`}</SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Button
                            className="w-full"
                            onClick={() =>
                              setSelectedCharacterArchetype(characterEntry.name)
                            }
                          >
                            Talent Tree
                          </Button>
                        </>
                      )}
                    </div>
                    {characterEntry ? (
                      characterEntry.spec.itemSpec.talentItems.map((talent) => (
                        <TalentCard
                          key={talent.talentItem.iD}
                          characterName={characterEntry.name}
                          talent={talent}
                          onTalentChange={onTalentChange}
                        />
                      ))
                    ) : (
                      <>
                        <LockIcon /> <p>Character Locked</p>
                      </>
                    )}
                  </div>
                  <Separator className="my-4" />
                </Fragment>
              );
            })}
          </div>

          <Button
            className="w-full min-h-[50px] rounded-none mt-4"
            onClick={onSaveChanges}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
