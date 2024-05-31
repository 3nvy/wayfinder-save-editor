import { useCallback, useContext, useMemo } from 'react';
import { SaveEditorContext } from '../../context/context';

import { Button } from '@/components/ui/button';

import {
  weaponGlamours,
  armourGlamours,
  awakenedWeapons,
  nonFungibleItems,
  fungibleItems,
  grantedItems,
} from '../../tables/foundersItems';
import {
  MFungibleItem,
  MHouseDefinition,
  MNonFungibleItem,
} from '../../saveFileTypes';

export const FounderPropForm = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  const onAwardItems = useCallback(() => {
    const newStructure = { ...saveStructure };

    if (newStructure.playerData) {
      /**
       * Award Weapon Glamours
       */
      const currentWeaponGlamours = newStructure.playerData?.m_InventoryData
        .m_WeaponGlamours as MHouseDefinition[];
      const remainingWeaponGlamours = weaponGlamours.filter(
        (wg) =>
          !currentWeaponGlamours.find((cwp) => cwp.rowName === wg.rowName),
      );
      newStructure.playerData.m_InventoryData.m_WeaponGlamours = [
        ...currentWeaponGlamours,
        ...remainingWeaponGlamours,
      ];

      /**
       * Award ArmourGlamours
       */
      const currentArmorGlamours = newStructure.playerData?.m_InventoryData
        .m_ArmorGlamours as MHouseDefinition[];
      const remainingArmorGlamours = armourGlamours.filter(
        (wg) => !currentArmorGlamours.find((cwp) => cwp.rowName === wg.rowName),
      );
      newStructure.playerData.m_InventoryData.m_ArmorGlamours = [
        ...currentArmorGlamours,
        ...remainingArmorGlamours,
      ];

      /**
       * Award Awakened Weapons Data
       */
      const currentAwakenedWeaponsData =
        newStructure.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons;
      const remainingAwakenedWeaponsData = awakenedWeapons.filter(
        (wg) =>
          !currentAwakenedWeaponsData.find(
            (cwp) =>
              cwp.awakenedWeaponHandle.rowName ===
              wg.awakenedWeaponHandle.rowName,
          ),
      );
      newStructure.playerData.m_AwakenedWeaponsData.m_AwakenedWeapons = [
        ...currentAwakenedWeaponsData,
        ...remainingAwakenedWeaponsData,
      ];

      /**
       * Award Non Fungible Items
       */
      const currentNonFungibleItems =
        newStructure.playerData.m_InventoryData.m_NonFungibleItems;
      const remainingNonFungibleItems = nonFungibleItems.filter(
        (wg) => !currentNonFungibleItems.find((cwp) => cwp.name === wg.name),
      ) as MNonFungibleItem[];
      newStructure.playerData.m_InventoryData.m_NonFungibleItems = [
        ...currentNonFungibleItems,
        ...remainingNonFungibleItems,
      ];

      /**
       * Award Fungible Items
       */
      const currentFungibleItems =
        newStructure.playerData.m_InventoryData.m_FungibleItems;
      const remainingFungibleItems = fungibleItems.filter(
        (wg) => !currentFungibleItems.find((cwp) => cwp.name === wg.name),
      ) as MFungibleItem[];
      newStructure.playerData.m_InventoryData.m_FungibleItems = [
        ...currentFungibleItems,
        ...remainingFungibleItems,
      ];

      /**
       * Award Granted Items
       */
      const currentGrantedItems =
        newStructure.playerData.m_InventoryData.m_GrantedFoundersItems;
      const remainingGrantedItems = grantedItems.filter(
        (wg) =>
          !currentGrantedItems.find(
            (cwp) => cwp.data.rowName === wg.data.rowName,
          ),
      );
      newStructure.playerData.m_InventoryData.m_GrantedFoundersItems = [
        ...currentGrantedItems,
        ...remainingGrantedItems,
      ];

      saveNewValues(newStructure);
    }
  }, []);

  return (
    <Button
      className="w-full h-[50px] rounded-none"
      type="submit"
      onClick={onAwardItems}
    >
      Award Founders Items
    </Button>
  );
};
