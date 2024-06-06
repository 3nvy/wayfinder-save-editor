export type FUNGIBLE_ITEM_STRUCTURE = {
  name: string;
  count: number;
};

export const FUNGIBLE_ITEM_STRUCTURE = {
  // Configurable Fields
  name: '{name here}',
  count: 0,
  // Static Fields
  equippedSlotId: '00000000000000000000000000000000',
  equippedSlotName: 'None',
  itemFlags: 0,
};

export type INVENTORY_ITEM = {
  key: string;
  localizedString: string;
  type: string;
  icon: string;
  bIsArchetype: boolean;
  bIsCharacter: boolean;
  bIsCraftingMaterial: boolean;
  bIsCraftable: boolean;
  bIsEquipable: boolean;
  bIsFogSoul: boolean;
  bIsTalent: boolean;
  bIsHousingItem: boolean;
  bIsPlayerSpray: boolean;
  bIsConsumable: boolean;
  bIsFlask: boolean;
  bIsNone: boolean;
  bIsFungible: boolean;
  bIsQuestRestricted: boolean;
  bIsEventItem: boolean;
  bIsImbuementVessel: boolean;
  bIsImbuement: boolean;
  bIsPseudoItem: boolean;
  bIsIOUItem: boolean;
  bIsFungibleMultiplierItem: boolean;
  bIsDye: boolean;
  bIsPlayerAction: boolean;
  bIsPlayerBadgeCustomization: boolean;
};
