/* eslint-disable no-restricted-syntax */
import { useCallback, useContext, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { WeaponCard } from './weapon-card/weapon-card';
import { SaveEditorContext } from '../../../context/context';
import { EditWeaponDialog } from './edit-weapon/edit-weapon';
import { WEAPONS } from '../../../tables/weapons';
import { MNonFungibleItem, SaveData } from '../../../saveFileTypes';
import { NON_FUNGIBLE_ITEM_STRUCTURE } from '../../../structures/structures';
import { generateSeed, generateUniqueID } from '../../../utils';
import { getWeaponExpFromLevel } from '../utils';

export type SlotDataStructure = {
  initialIdx: number;
  name: string;
  isEquipped: boolean;
};

export type EssentialWeaponData = {
  id?: string;
  key: string;
  currentXP: number;
  startingExp: number;
  icon: string;
  name: string;
  echoSlots: SlotDataStructure[];
};

export function InventoryWeapons() {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  // Enable Add Mode
  const [isAddMode, setIsAddMode] = useState(false);

  // Sets Selected Echo
  const [selectedWeapon, setSelectedWeapon] = useState<EssentialWeaponData>();

  const weaponsList = useMemo(() => {
    if (isAddMode) {
      return WEAPONS.reduce<EssentialWeaponData[]>((acc, weapon) => {
        acc.push({
          key: weapon.key,
          currentXP: 0,
          startingExp: 0,
          icon: weapon.icon,
          name: weapon.localizedString ?? 'N/A',
          echoSlots: [],
        });

        return acc;
      }, []).sort((a, b) => a.name.localeCompare(b.name));
    }

    return saveStructure?.playerData?.m_InventoryData.m_NonFungibleItems
      .reduce<EssentialWeaponData[]>((acc, item) => {
        const matchingWeapon = WEAPONS.find(
          (weapon) => weapon.key === item.name,
        );
        if (matchingWeapon) {
          acc.push({
            id: item.iD,
            key: matchingWeapon.key,
            currentXP: item.spec.itemSpec.currentExp,
            startingExp: item.spec.itemSpec.startingExp,
            icon: matchingWeapon.icon,
            name: matchingWeapon.localizedString ?? 'N/A',
            echoSlots: item.spec.itemSpec.m_GeneratedFogSoulSlots.map(
              (slot, idx) => ({
                initialIdx: idx,
                name: slot.category,
                isEquipped: (+item.spec.itemSpec.fogSouls[idx] || 0) !== 0,
              }),
            ),
          });
        }
        return acc;
      }, [])
      .reverse();
  }, [saveStructure, isAddMode]);

  const onSaveHandle = useCallback(
    (values: any) => {
      const hasId = !!values.id;
      const newStructure = JSON.parse(
        JSON.stringify(saveStructure),
      ) as SaveData;

      const weaponExp = getWeaponExpFromLevel(values.level);
      if (hasId) {
        const matchingWeapon =
          newStructure.playerData.m_InventoryData.m_NonFungibleItems.find(
            (item) => item.iD === values.id,
          )!;
        matchingWeapon.spec.itemSpec.currentExp = weaponExp;
        matchingWeapon.spec.itemSpec.startingExp = weaponExp;
        // Needs to change the fogSoul structure of the item and the loadout entry
        const newFogSoulStructure = values.echoSlots.map(
          (slot: SlotDataStructure) =>
            matchingWeapon.spec.itemSpec.fogSouls[slot.initialIdx] ??
            '00000000000000000000000000000000',
        );
        // Fog Soul sturcture for loadout entries
        for (const loadout of newStructure.playerData.m_LoadoutData
          .m_Loadouts) {
          for (const loadoutItem of loadout.items) {
            if (loadoutItem.itemHandle.data.rowName === matchingWeapon.name)
              loadoutItem.attachedFogSouls = newFogSoulStructure;
          }
        }
        // Fog Soul structure for item entry
        matchingWeapon.spec.itemSpec.fogSouls = newFogSoulStructure;
        matchingWeapon.spec.itemSpec.m_GeneratedFogSoulSlots =
          values.echoSlots.map((slot: SlotDataStructure, idx: number) => {
            const existingSlot = matchingWeapon.spec.itemSpec
              .m_GeneratedFogSoulSlots[idx] ?? {
              category: '',
              bAffectsBudgetCapacity: true,
              bIsUnlocked: false,
              bIsProgressionSlot: false,
            };
            return {
              ...existingSlot,
              category: slot.name,
            };
          });
      } else {
        const weaponEntry = WEAPONS.find(
          (weapon) => weapon.data.rowName === values.key,
        )!;

        // Check and Add Items to Add On Creation
        for (const personaData of weaponEntry.addItemsWhenCreated) {
          // Check and Add Weapon Persona
          const existingWeaponPersona =
            !!newStructure.playerData.m_InventoryData.m_NonFungibleItems.find(
              (item) => item.name === personaData.rowName,
            );

          if (!existingWeaponPersona) {
            const weaponPersona = {
              ...JSON.parse(JSON.stringify(NON_FUNGIBLE_ITEM_STRUCTURE)),
              name: personaData.rowName,
              iD: generateUniqueID(),
            } as MNonFungibleItem;
            weaponPersona.spec.itemSpec.initialSeed = generateSeed();
            weaponPersona.spec.itemSpec.itemFlags = 8;

            newStructure.playerData.m_InventoryData.m_NonFungibleItems.push(
              weaponPersona,
            );
          }

          // Check and Add Weapon Glamour
          const hasWeaponGlamour =
            !!newStructure.playerData.m_InventoryData.m_WeaponGlamours.find(
              (wg) => wg.rowName === personaData.rowName,
            );

          if (!hasWeaponGlamour) {
            const weaponGlamour = { ...personaData };
            newStructure.playerData.m_InventoryData.m_WeaponGlamours.push(
              weaponGlamour,
            );
          }
        }

        // Check and Add Awakening Entry
        const hasAwakeningHandle =
          !!newStructure.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons.find(
            (awh) => awh.awakenedWeaponHandle.rowName === values.key,
          );

        if (!hasAwakeningHandle) {
          const awakeningHandle = {
            awakenedWeaponHandle: { ...weaponEntry.data },
            awakeningLevel: 0,
          };
          newStructure.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons.push(
            awakeningHandle,
          );
        }

        // Check and Add Discovery????

        const newWeapon = {
          ...JSON.parse(JSON.stringify(NON_FUNGIBLE_ITEM_STRUCTURE)),
          name: values.key,
          iD: generateUniqueID(),
        } as MNonFungibleItem;
        newWeapon.spec.itemSpec.initialSeed = generateSeed();
        newWeapon.spec.itemSpec.currentExp = weaponExp;
        newWeapon.spec.itemSpec.startingExp = weaponExp;
        newWeapon.spec.itemSpec.fogSouls = Array(values.echoSlots.length).fill(
          '00000000000000000000000000000000',
        );
        newWeapon.spec.itemSpec.m_GeneratedFogSoulSlots = values.echoSlots.map(
          (slot: [number, string, number][]) => ({
            category: slot[1],
            bAffectsBudgetCapacity: true,
            bIsUnlocked: false,
            bIsProgressionSlot: false,
          }),
        );
        newStructure.playerData.m_InventoryData.m_NonFungibleItems.push(
          newWeapon,
        );
      }

      saveNewValues(newStructure);
      setSelectedWeapon(undefined);
      setIsAddMode(false);
    },
    [saveNewValues, saveStructure],
  );

  return (
    <div className="flex flex-wrap gap-5 max-h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
      {selectedWeapon && (
        <EditWeaponDialog
          weapon={selectedWeapon}
          onSave={onSaveHandle}
          onClose={() => setSelectedWeapon(undefined)}
        />
      )}

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
                  <span>Back To Owned Weapons</span>
                </>
              ) : (
                <>
                  <PlusIcon />
                  Add Weapon
                </>
              )}
            </CardTitle>
          </CardHeader>
        </Button>
      </Card>

      {/* Weapon List */}
      {weaponsList?.map((weapon) => (
        <WeaponCard key={weapon.id ?? weapon.key} weapon={weapon}>
          <Button
            className="w-full min-h-[50px] mb-[-13px] rounded-lg rounded-tl-none rounded-tr-none"
            type="submit"
            onClick={() => setSelectedWeapon(weapon)}
          >
            {isAddMode ? 'Add' : 'Edit'}
          </Button>
        </WeaponCard>
      ))}
    </div>
  );
}
