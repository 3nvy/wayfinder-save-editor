/* eslint-disable no-use-before-define */
// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type SaveData = {
  header?: Header;
  playerData: PlayerData;
  clientPlayerData?: ClientPlayerData;
};

export type ClientPlayerData = {
  m_Version: number;
  m_MapData: MMapData;
};

export type MMapData = {
  m_Version: number;
  m_FogOfWarTextures: MFogOfWarTextures;
};

export type MFogOfWarTextures = {};

export type Header = {
  equippedCharacter: EquippedCharacter;
  equippedPowerLevel: number;
  wayfinderRank: number;
  currentQuestName: string;
  areaName: string;
  timestamp: string;
};

export type EquippedCharacter = {
  handle: Handle;
  count: number;
  spec: ItemSpecClass;
};

export type Handle = {
  data: MHouseDefinition;
  iD: string;
};

export type MHouseDefinition = {
  dataTable: string;
  rowName: string;
};

export type ItemSpecClass = {
  equippedToSlotId: string;
  equipmentSlots: any[];
  equippedToSlotName: string;
  fogSouls: any[];
  fogSoulAttachedTo: string;
  bMatchesFogSoulCategory: boolean;
  bDoNotSave: boolean;
  bStarterItem: boolean;
  currentExp: number;
  fusionFedExp: number;
  startingExp: number;
  rankUnlocked: number;
  numTempers: number;
  numOfProgressionTempers: number;
  currentAwakeningLevel: number;
  totalAwakeningStonesUsed: number;
  currentMaxResonanceExp: number;
  dyes: any[];
  initialSeed: number;
  randomSeeds: RandomSeed[];
  abilitySlots: AbilitySlot[];
  imbuementSlots: any[];
  currentImbuementCharges: number;
  reinforcementIds: any[];
  talentItems: TalentItem[];
  aspectBoosts: any[];
  echoRarity: EchoRarity;
  bHasEverBeenEquipped: boolean;
  m_GeneratedFogSoulSlots: MGeneratedFogSoulSlot[];
  placedHouseProxyId: string;
  dependents: Handle[];
  unlockTags: Tags;
  flaskSpec: FlaskSpec;
  itemFlags: number;
};

export type AbilitySlot = {
  appliedAbilityHandles: any[];
  currentAbilityData: MHouseDefinition;
  isSet: boolean;
};

export enum EchoRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
}

export type FlaskSpec = {
  currentCharges: number;
  maxCharges: number;
  baseMagnitude: number;
  baseCooldownSeconds: number;
};

export type MGeneratedFogSoulSlot = {
  category: string;
  bAffectsBudgetCapacity: boolean;
  bIsUnlocked: boolean;
  bIsProgressionSlot: boolean;
};

export type RandomSeed = {
  name: string;
  seed: number;
};

export type TalentItem = {
  talentItem: Handle;
  numPointsSpent: number;
};

export type Tags = {
  gameplayTags: GameplayTag[];
};

export type GameplayTag = {
  tagName: string;
};

export type PlayerData = {
  m_Version: number;
  m_InventoryData: MInventoryData;
  m_LoadoutData: MLoadoutData;
  m_DiscoveryData: MDiscoveryData;
  m_HousingData: MHousingData;
  m_BattlePassDataV2: MBattlePassDataV2;
  m_QuestData: MQuestData;
  m_PooledQuestOfferData: MPooledQuestOfferData;
  m_WorldData: MWorldData;
  m_EscrowData: MEscrowData;
  m_AchievementData: MAchievementData;
  m_PeriodicInteractableData: MPeriodicInteractableData;
  m_VendorData: MVendorData;
  m_RaidLootConditions: MRAIDLootConditions;
  m_WayfinderRankData: MWayfinderRankData;
  m_ArchetypeTreeData: MArchetypeTreeData;
  m_AwakenedWeaponsData: MAwakenedWeaponsData;
  m_WayfinderLevelStatusData: MWayfinderLevelStatusData;
  m_PersistedEffectData: MPersistedEffectData;
  m_PersistedSortSelectionData: MPersistedSortSelectionData;
};

export type MAchievementData = {
  m_Version: number;
  m_InprogressAchivements: MInprogressAchivement[];
};

export type MInprogressAchivement = {
  achievementId: string;
  progress: number;
};

export type MArchetypeTreeData = {
  m_Version: number;
  m_UnlockedTreeData: any[];
};

export type MAwakenedWeaponsData = {
  m_Version: number;
  m_AwakenedWeapons: MAwakenedWeapon[];
};

export type MAwakenedWeapon = {
  awakenedWeaponHandle: MHouseDefinition;
  awakeningLevel: number;
};

export type MBattlePassDataV2 = {
  m_Version: number;
  m_Progression: MProgression;
};

export type MProgression = {
  m_progress: MProgress;
  m_Collection: MCollection[];
};

export type MCollection = {
  m_RowHandle: MHouseDefinition;
  m_LastClaimedRoomCollection: MLastClaimedRoomCollection;
  m_IsActive: boolean;
  m_RoomContainer: MRoomContainer;
};

export type MLastClaimedRoomCollection = {
  battlePassV2LastClaimedRooms: BattlePassV2LastClaimedRoom[];
};

export type BattlePassV2LastClaimedRoom = {
  floorHandle: MHouseDefinition;
  lastClaimedRoomHandle: MHouseDefinition;
};

export type MRoomContainer = {
  m_Records: MRecord[];
  arrayReplicationKey: number;
};

export type MRecord = {
  m_RowHandle: MHouseDefinition;
  m_State: MState;
};

export enum MState {
  Accessible = 'ACCESSIBLE',
  Claimed = 'CLAIMED',
  Inaccessible = 'INACCESSIBLE',
}

export type MProgress = {
  m_Experience: number;
  m_Keys: number;
};

export type MDiscoveryData = {
  m_Version: number;
  m_StatAndDiscoveryInfo: MStatAndDiscoveryInfo;
};

export type MStatAndDiscoveryInfo = {
  stats: Stat[];
  discoveries: Discovery[];
};

export type Discovery = {
  discoveryRef: MHouseDefinition;
  lastAwardedLevel: number;
  claimedLevels: any[];
  version: number;
};

export type Stat = {
  statRef: MHouseDefinition;
  progressedByTags: Tags;
  value: number;
  version: number;
};

export type MEscrowData = {
  m_Version: number;
  m_MatchEscrowId: string;
  m_MatchEscrowItems: any[];
};

export type MHousingData = {
  m_Version: number;
  m_HouseId: MHouseID;
  m_HouseDefinition: MHouseDefinition;
  m_ApartmentManifest: MApartmentManifest;
};

export type MApartmentManifest = {
  iD: ID;
  name: string;
  area: string;
  lotInfo: any[];
  levelManifest: LevelManifest;
};

export enum ID {
  None = 'None',
}

export type LevelManifest = {
  levelGenerationId: string;
  passedValidation: boolean;
  levelGenerationSeed: number;
  levelGeneratorVersion: number;
  tileUnitLength: number;
  lightingScenarioLevel: ID;
  tiles: any[];
  wingInfoList: any[];
  staticEvents: any[];
};

export type MHouseID = {
  area: string;
  neighborhoodId: ID;
  lotId: ID;
};

export type MInventoryData = {
  m_Version: number;
  m_FungibleItems: MFungibleItem[];
  m_NonFungibleItems: MNonFungibleItem[];
  m_equipmentSlots: any[];
  m_WeaponGlamours: MHouseDefinition[];
  m_ArmorGlamours: MHouseDefinition[];
  m_bHasReceivedStarterItems: boolean;
  m_bHasReceivedFoundersPackItems: boolean;
  m_bHasSeenFoundersCoinTutorial: boolean;
  m_GrantedFoundersItems: MGrantedFoundersItem[];
  m_bIsMockData: boolean;
};

export type MFungibleItem = {
  name: string;
  equippedSlotId: string;
  equippedSlotName: ID;
  count: number;
  itemFlags: number;
};

export type MGrantedFoundersItem = {
  data: MHouseDefinition;
  amount: number;
  level: number;
};

export type MNonFungibleItem = {
  name: string;
  iD: string;
  spec: MNonFungibleItemSpec;
};

export type MNonFungibleItemSpec = {
  itemSpec: ItemSpecClass;
};

export type MLoadoutData = {
  m_Version: number;
  m_Loadouts: MLoadout[];
  m_CurrentLoadoutName: string;
};

export type MLoadout = {
  loadoutName: string;
  loadoutItems: any[];
  items: Item[];
  weaponGlamours: any[];
  armorGlamours: ArmorGlamour[];
  previousWeaponGlamours: any[];
  previousArmorGlamours: any[];
};

export type ArmorGlamour = {
  armorSlot: string;
  source: MHouseDefinition;
};

export type Item = {
  itemHandle: Handle;
  attachedFogSouls: any[];
};

export type MPeriodicInteractableData = {
  m_Version: number;
  m_ItemLastUsedTimes: any[];
  m_InteractableStates: any[];
};

export type MPersistedEffectData = {
  m_Version: number;
  m_TravelPersistedEffects: any[];
};

export type MPersistedSortSelectionData = {
  m_SortMethods: MSortMethod[];
};

export type MSortMethod = {
  m_MenuReference: MHouseDefinition;
  m_SortMethod: string;
};

export type MPooledQuestOfferData = {
  m_Version: number;
  m_PooledQuestOfferContainer: MPooledQuestOfferContainer;
};

export type MPooledQuestOfferContainer = {
  m_pooledQuestOfferRecords: MPooledQuestOfferRecord[];
};

export type MPooledQuestOfferRecord = {
  m_questRef: MHouseDefinition;
  m_questPoolRef: MHouseDefinition;
  m_windowType: MWindowType;
};

export enum MWindowType {
  Long = 'LONG',
  Short = 'SHORT',
}

export type MQuestData = {
  m_Version: number;
  m_ActiveQuestRecords: MActiveQuestRecord[];
  m_CompletedQuestRecords: MCompletedQuestRecord[];
  m_Archived_ActiveQuestRecords: any[];
  m_Archived_CompletedQuestRecords: any[];
};

export type MActiveQuestRecord = {
  m_objectivePhaseRecords: MObjectivePhaseRecord[];
  m_objectivePhaseIndex: number;
  m_bFailed: boolean;
  m_trackedIndex: number;
  m_questRef: MHouseDefinition;
  m_stateTags: Tags;
  m_startedTime: MStartedTime;
  m_questVersion: number;
  m_questId: string;
  m_pooled_questPool: ID;
  m_pooled_windowType: MPooledWindowType;
};

export type MObjectivePhaseRecord = {
  objectiveRecords: ObjectiveRecord[];
  failureObjectiveRecords: any[];
  m_phaseIndex: number;
};

export type ObjectiveRecord = {
  m_progressValue: number;
  m_objectiveId: MObjectiveID;
};

export type MObjectiveID = {
  phaseIndex: number;
  objectiveIndex: number;
  bIsFailure: boolean;
};

export enum MPooledWindowType {
  Invalid = 'INVALID',
}

export enum MStartedTime {
  The20240528183900 = '2024.05.28-18.39.00',
  The20240528184220 = '2024.05.28-18.42.20',
  The20240528192911 = '2024.05.28-19.29.11',
  The20240528193125 = '2024.05.28-19.31.25',
  The20240528193340 = '2024.05.28-19.33.40',
  The20240528194020 = '2024.05.28-19.40.20',
}

export type MCompletedQuestRecord = {
  m_completedTime: string;
  m_completedCount: number;
  m_bFailed: boolean;
  m_questRef: MHouseDefinition;
  m_stateTags: Tags;
  m_startedTime: string;
  m_questVersion: number;
  m_questId: string;
  m_pooled_questPool: ID;
  m_pooled_windowType: MPooledWindowType;
};

export type MRAIDLootConditions = {
  m_Version: number;
  m_ManagedRaidLoot: any[];
};

export type MVendorData = {
  m_Version: number;
  m_StockInfos: MStockInfo[];
};

export type MStockInfo = {
  m_VendorName: string;
  m_Interval: MInterval;
  m_ItemRowName: string;
  m_RemainingAmount: number;
};

export type MInterval = {
  m_IntervalType: string;
  m_IntervalData: string;
};

export type MWayfinderLevelStatusData = {
  m_Version: number;
  m_WayfinderLevelStatus: MWayfinderLevelStatus[];
  m_WayfinderAwakeningLevelStatus: MWayfinderLevelStatus[];
};

export type MWayfinderLevelStatus = {
  wayfinderHandle: MHouseDefinition;
  highestLevelReached: number;
  rewardsAlreadyGranted: any[];
};

export type MWayfinderRankData = {
  m_Version: number;
  m_WayfinderExperience: number;
};

export type MWorldData = {
  m_Version: number;
  m_InstancedPersistentLocation: Location;
  m_PublicPersistentLocation: Location;
  m_NextAreaUnlockLocation: Location;
  m_SignalFireData: MSignalFireDatum[];
};

export type Location = {
  mapRow: MHouseDefinition;
  mapName: string;
  returnStartTag: string;
  transform: Transform;
};

export type Transform = {
  rotation: Rotation;
  translation: Rotation;
  scale3D: Rotation;
};

export type Rotation = {
  x: number;
  y: number;
  z: number;
  w?: number;
};

export type MSignalFireDatum = {
  zoneName: string;
  unlockedSignalFires: UnlockedSignalFire[];
};

export type UnlockedSignalFire = {
  unlockedSignalFireId: string;
  unlockedSignalFireDisplayName: string;
};
