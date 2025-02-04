import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LockIcon, SkullIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
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
const characters = Object.keys(CharacterInfo);
const normalizedCharacterName = Object.entries(CharacterInfo).reduce<{
  [key: string]: string;
}>((acc, [k, v]) => {
  acc[k] = v.name;
  return acc;
}, {});

export const Characters = () => {
  const [selectedCharacterArchetype, setSelectedCharacterArchetype] =
    useState<string>();

  const { assetsPath, saveStructure, saveNewValues } = useSaveContext();

  const [currentWayfinderRank, setCurrentWayfinderRank] = useState(() =>
    expToRankLevel(
      saveStructure?.playerData.m_WayfinderRankData.m_WayfinderExperience ?? 0,
      WayfinderRankLevelCurve,
    ),
  );

  const [currentDifficulty, setCurrentDifficulty] = useState(
    saveStructure?.header?.difficulty ?? 'Story',
  );

  const [isHardcore, setIsHardcore] = useState(
    saveStructure?.header?.bHardcoreMode ?? false,
  );

  const [deadCharacters, setDeadCharacters] = useState(
    saveStructure?.playerData.m_PersistedHardcoreDeadCharacterData?.m_DeadCharacters.map(
      (character) => character.m_CharacterName,
    ) ?? [],
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

  const sortedCharacters = useMemo(() => {
    return characters?.sort((characterA, characterB) => {
      const characterAEntry = charactersData.find(
        (character) => character.name === characterA,
      );
      const characterAEntryAlive = !deadCharacters?.includes(
        normalizedCharacterName[characterAEntry?.name ?? ''],
      );

      const characterBEntry = charactersData.find(
        (character) => character.name === characterB,
      );
      const characterBEntryAlive = !deadCharacters?.includes(
        normalizedCharacterName[characterBEntry?.name ?? ''],
      );

      if (characterAEntry && !characterBEntry) return -1;
      if (characterAEntryAlive && !characterBEntryAlive) return -1;

      return 0;
    });
  }, [charactersData, deadCharacters]);

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

  const onCharacterRevive = useCallback(
    (characterName: string) => {
      const name = normalizedCharacterName[characterName];
      setDeadCharacters(deadCharacters?.filter((c) => c !== name));
    },
    [deadCharacters],
  );

  const onSaveChanges = useCallback(() => {
    const newSaveData = JSON.parse(JSON.stringify(saveStructure)) as SaveData;

    // Save Difficulty
    newSaveData.header.difficulty = currentDifficulty;

    // Set Hardcore Mode
    if ('bHardcoreMode' in newSaveData.header)
      newSaveData.header.bHardcoreMode = isHardcore;

    // Check for revived characters
    if (newSaveData.playerData.m_PersistedHardcoreDeadCharacterData) {
      const currentDeadCharactersCount =
        newSaveData.playerData.m_PersistedHardcoreDeadCharacterData
          .m_DeadCharacters.length ?? 0;

      if (deadCharacters.length !== currentDeadCharactersCount) {
        const newDeadCharacterList =
          newSaveData?.playerData.m_PersistedHardcoreDeadCharacterData.m_DeadCharacters.filter(
            (character) =>
              deadCharacters.some(
                (dCharacter) => dCharacter === character.m_CharacterName,
              ),
          );

        // Makes save usable again (because there are now alive characters)
        newSaveData.playerData.m_PersistedHardcoreDeadCharacterData.m_bSaveLocked =
          false;

        newSaveData.playerData.m_PersistedHardcoreDeadCharacterData.m_DeadCharacters =
          newDeadCharacterList;

        newSaveData.header.hardcoreCharacterData = newDeadCharacterList;
      }
    }

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
    deadCharacters,
    isHardcore,
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
              <Label htmlFor="difficulty">Difficulty</Label>
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

            <div className="flex justify-center items-center mt-3 gap-3">
              <Label htmlFor="hardcore">Hardcore Mode</Label>
              <Checkbox
                id="hardcore"
                name="hardcore"
                checked={isHardcore}
                onCheckedChange={() => setIsHardcore(!isHardcore)}
              />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col items-center overflow-auto">
            {sortedCharacters.map((characterID) => {
              const characterEntry = charactersData.find(
                (character) => character.name === characterID,
              );
              const characterInfo =
                CharacterInfo[characterID as keyof typeof CharacterInfo];

              const characterIsDead =
                isHardcore &&
                deadCharacters?.includes(
                  normalizedCharacterName[characterEntry?.name ?? ''],
                );

              return (
                <Fragment key={characterID}>
                  <div className="flex flex-wrap gap-[25px] items-center">
                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <img
                          className="w-[150px] h-[150px]"
                          src={`file://${assetsPath}/${characterInfo?.icon}.png`}
                          alt={characterInfo.name}
                        />
                        {characterIsDead && (
                          <img
                            className="w-[150px] h-[150px] absolute top-0"
                            src={`file://${assetsPath}/dead.png`}
                            alt={characterInfo.name}
                          />
                        )}
                      </div>
                      {characterEntry && !characterIsDead && (
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
                    {!characterEntry && (
                      <>
                        <LockIcon /> <p>Character Locked</p>
                      </>
                    )}
                    {characterEntry && characterIsDead && (
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                          <SkullIcon /> <p>Character Is Dead</p>
                        </div>
                        <Button
                          onClick={() => onCharacterRevive(characterEntry.name)}
                        >
                          Revive
                        </Button>
                      </div>
                    )}
                    {characterEntry &&
                      !characterIsDead &&
                      characterEntry.spec.itemSpec.talentItems.map((talent) => (
                        <TalentCard
                          key={talent.talentItem.iD}
                          characterName={characterEntry.name}
                          talent={talent}
                          onTalentChange={onTalentChange}
                        />
                      ))}
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
