import { useCallback, useContext } from 'react';
import { SaveEditorContext } from '../../context/context';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { MNonFungibleItem, SaveData } from '../../saveFileTypes';
import { NON_FUNGIBLE_ITEM_STRUCTURE } from '../../structures/structures';
import { generateSeed, generateUniqueID } from '../../utils';

export const ExperimentalTab = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  /**
   * House Related Stuff
   */
  const canUnlockNewHouse =
    saveStructure?.playerData.m_HousingData.m_ApartmentManifest.iD !== 'None';
  const onUnlockHouse = useCallback(() => {
    const newSaveStructure = { ...saveStructure } as SaveData;
    newSaveStructure.playerData.m_HousingData.m_HouseDefinition.rowName =
      'Apartment_01_Large';
    newSaveStructure.playerData.m_HousingData.m_ApartmentManifest.lotInfo[0].houseDefinition.rowName =
      'Apartment_01_Large';

    saveNewValues(newSaveStructure);
  }, [saveStructure]);

  /**
   * Kyros Fix Related Stuff
   */
  const kyrosMissingAbilityItems = [
    'Battlemage_AspectOfMorath',
    'Battlemage_AspectOfArkyn',
    'Battlemage_AspectOfUrda',
    'KyrosAbility1Upgrades',
    'KyrosAbility2Upgrades',
    'KyrosAbility3Upgrades',
    'KyrosAbilityUltUpgrades',
  ];

  const onKyrosFix = useCallback(() => {
    const newSaveStructure = { ...saveStructure } as SaveData;
    const kyrosCharacterEntry =
      newSaveStructure.playerData.m_InventoryData.m_NonFungibleItems.find(
        (item) => item.name === 'BattleMageCharacter',
      );
    if (kyrosCharacterEntry) {
      const nonFungibleItems =
        newSaveStructure.playerData.m_InventoryData.m_NonFungibleItems;

      const talents = kyrosCharacterEntry.spec.itemSpec.talentItems;

      for (const itemName of kyrosMissingAbilityItems) {
        const hasItem = nonFungibleItems.find((item) => item.name === itemName);
        const hasHandler = talents.find(
          (talent) => talent.talentItem.data.rowName === itemName,
        );

        const uniqueID = generateUniqueID();

        if (!hasItem) {
          const newItem = {
            ...JSON.parse(JSON.stringify(NON_FUNGIBLE_ITEM_STRUCTURE)),
            name: itemName,
            iD: uniqueID,
          } as MNonFungibleItem;

          newItem.spec.itemSpec.initialSeed = generateSeed();
          newItem.spec.itemSpec.itemFlags = 8;

          nonFungibleItems.push(newItem);
        }

        if (!hasHandler) {
          const newTalent = {
            talentItem: {
              data: {
                dataTable: `DataTable'/Game/Data/Inventory/Talents/${itemName.includes('Aspect') ? 'AspectPerks.AspectPerks' : 'AbilityUpgrades.AbilityUpgrades'}'`,
                rowName: itemName,
              },
              iD: uniqueID,
            },
            numPointsSpent: 0,
          };

          kyrosCharacterEntry.spec.itemSpec.talentItems.push(newTalent);
        }
      }

      saveNewValues(newSaveStructure);
    }
  }, [saveStructure]);

  return (
    <div className="flex flex-col max-h-full h-full">
      <Alert>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Attention!</AlertTitle>
        <AlertDescription>
          These features are experimental and may cause bugs. Use at your own
          risk!
        </AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-12 overflow-auto w-full pt-[20px] pb-[20px]">
        <div>
          <CardTitle>Unlock Big House</CardTitle>
          <CardDescription className="mt-2">
            This will replace your current house with a bigger one
          </CardDescription>
          <CardFooter className="mt-4 p-0 gap-5">
            <Button disabled={!canUnlockNewHouse} onClick={onUnlockHouse}>
              Unlock
            </Button>
            {!canUnlockNewHouse && (
              <div className="flex gap-2 items-center">
                <ExclamationTriangleIcon />
                <p>You must first unlock your first house</p>
              </div>
            )}
          </CardFooter>
        </div>

        <div>
          <CardTitle>Fix Kyros (Only apply if your Kyros is broken)</CardTitle>
          <CardDescription className="mt-2">
            There was a bug on previous versions that broke Kyros when added via
            the Founder tab, such as being unable to add skill points to his
            abilities.
          </CardDescription>
          <CardDescription className="mt-2">
            This will help fixing it, by adding the remaining Kyros stats to the
            save.
          </CardDescription>
          <CardDescription className="mt-2">
            ATTENTION: Please ensure that you don't have Kyros equiped prior to
            doing this!!!
          </CardDescription>
          <Button className="mt-4" onClick={onKyrosFix}>
            Apply Fix
          </Button>
        </div>
      </div>
    </div>
  );
};
