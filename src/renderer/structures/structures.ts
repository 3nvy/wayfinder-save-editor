/* eslint-disable no-redeclare */
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

export type NON_FUNGIBLE_ITEM_STRUCTURE = {
  name: string;
  iD: string;
  spec: {
    itemSpec: {
      initialSeed: number;
    };
  };
};

export const NON_FUNGIBLE_ITEM_STRUCTURE = {
  name: '{name here}',
  iD: '{id here}',
  spec: {
    itemSpec: {
      equippedToSlotId: '00000000000000000000000000000000',
      equipmentSlots: [],
      equippedToSlotName: 'None',
      fogSouls: [],
      fogSoulAttachedTo: '00000000000000000000000000000000',
      bMatchesFogSoulCategory: false,
      bDoNotSave: false,
      bStarterItem: false,
      currentExp: 0,
      fusionFedExp: 0,
      startingExp: 0,
      rankUnlocked: 1,
      numTempers: 0,
      numOfProgressionTempers: 0,
      currentAwakeningLevel: 0,
      totalAwakeningStonesUsed: 0,
      currentMaxResonanceExp: 0,
      dyes: [],
      initialSeed: -1834382290,
      randomSeeds: [],
      abilitySlots: [],
      imbuementSlots: [],
      currentImbuementCharges: 0,
      reinforcementIds: [],
      talentItems: [],
      aspectBoosts: [],
      echoRarity: 'NotAssigned',
      bHasEverBeenEquipped: false,
      m_GeneratedFogSoulSlots: [],
      placedHouseProxyId: '00000000000000000000000000000000',
      dependents: [],
      unlockTags: {
        gameplayTags: [],
      },
      flaskSpec: {
        currentCharges: 0,
        maxCharges: 0,
        baseMagnitude: 0,
        baseCooldownSeconds: 0,
      },
      itemFlags: 0,
    },
  },
};

export type INVENTORY_ITEM = {
  key: string;
  localizedString: string;
  type: string;
  icon: string;
  bIsFungible: boolean;
  bIsArchetype?: boolean;
  bIsCharacter?: boolean;
  bIsCraftingMaterial?: boolean;
  bIsCraftable?: boolean;
  bIsEquipable?: boolean;
  bIsFogSoul?: boolean;
  bIsTalent?: boolean;
  bIsHousingItem?: boolean;
  bIsPlayerSpray?: boolean;
  bIsConsumable?: boolean;
  bIsFlask?: boolean;
  bIsNone?: boolean;
  bIsQuestRestricted?: boolean;
  bIsEventItem?: boolean;
  bIsImbuementVessel?: boolean;
  bIsImbuement?: boolean;
  bIsPseudoItem?: boolean;
  bIsIOUItem?: boolean;
  bIsFungibleMultiplierItem?: boolean;
  bIsDye?: boolean;
  bIsPlayerAction?: boolean;
  bIsPlayerBadgeCustomization?: boolean;
  data?: {
    dataTable: string;
    rowName: string;
  };
  addItemsWhenCreated?: {
    dataTable: string;
    rowName: string;
  }[];
  echoData?: {
    type: string;
    description: string;
    soulBudgetCost: string;
  };
  equipmentSlot?: string;
  packName?: string;
};
