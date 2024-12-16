export type NightmareChallengeProps = {
  key: string;
  name: string;
  description: string;
  rewards: string[];
};

export const NIGHTMARE_CHALLENGES: NightmareChallengeProps[] = [
  {
    key: 'NightmareChallenge_01',
    name: 'Badge of the Aurelian',
    description: 'Defeat All Aurelian Bosses',
    rewards: ['Housing_Trophy_EpicRuinsChest', 'DLC_TricksterPersona'],
  },
  {
    key: 'NightmareChallenge_02',
    name: 'Badge of the Deep',
    description: 'Defeat All Bosses of the Deep',
    rewards: ['Housing_Trophy_EpicMinesChest', 'DLC_EngineerPersona'],
  },
  {
    key: 'NightmareChallenge_03',
    name: 'Badge of Frost',
    description: 'Defeat All Reaver Woods Bosses',
    rewards: ['Housing_Trophy_EpicReaverWoodsChest', 'DLC_GraymournPersona'],
  },
  {
    key: 'NightmareChallenge_04',
    name: 'Badge of Growth',
    description: 'Defeat All Crucible Bosses',
    rewards: ['Housing_Trophy_EpicGorgeChest', 'DLC_AvarysPersona'],
  },
  {
    key: 'NightmareChallenge_05',
    name: 'Answered the Call',
    description: 'Unlock All Wayfinders',
    rewards: [
      'ProfileTitle_001_NM',
      'Housing_Deco_RoseTable_01',
      'DLC_OmenPersona',
      'Dye_Emissive_36',
    ],
  },
  {
    key: 'NightmareChallenge_06',
    name: '8 Going on 30',
    description: 'Level All Wayfinders to 30',
    rewards: [
      'ProfileTitle_006_NM',
      'DLC_SeekerAvalaPersona',
      'Housing_Deco_NeonSign_01',
      'Housing_Deco_NeonSign_02',
      'Housing_Deco_NeonSign_03',
      'Housing_Deco_NeonSign_04',
      'Housing_Deco_NeonSign_05',
      'Dye_Emissive_35',
    ],
  },
  {
    key: 'NightmareChallenge_07',
    name: 'Stalker',
    description: 'Complete Mythic Bounties',
    rewards: [
      'Housing_Deco_HuntmasterAxe_01',
      'Housing_Deco_RoseTable_02',
      'Housing_Deco_RoseTableLamp_01',
    ],
  },
  {
    key: 'NightmareChallenge_08',
    name: 'Slayer',
    description: 'Complete Mythic Bounties',
    rewards: [
      'ProfileTitle_005_NM',
      'Housing_Deco_HuntmasterSkull_01',
      'Housing_Deco_HuntmasterSkull_02',
      'Housing_Deco_HuntmasterSkull_03',
    ],
  },
  {
    key: 'NightmareChallenge_09',
    name: 'Frostmarch Sentinel',
    description: 'Complete Patrols in Frostmarch',
    rewards: [
      'Housing_Deco_RoseTableLamp_01',
      'Housing_Deco_RoseTeacup_01',
      'Dye_Emissive_37',
    ],
  },
  {
    key: 'NightmareChallenge_10',
    name: 'Wilds Surveyor',
    description: 'Complete Patrols in the Crucible',
    rewards: [
      'Housing_Deco_RoseTeapot_01',
      'Housing_Deco_RoseTeacup_01',
      'Dye_BlueGreen_09',
    ],
  },
  {
    key: 'NightmareChallenge_11',
    name: 'Career Ladder',
    description: 'Complete Jobs/Labors on Nightmare',
    rewards: [
      'DLC_WolfPersona',
      'Housing_Deco_WolfsShield_01',
      'Housing_Deco_RoseRug_01',
      'Dye_Emissive_45',
    ],
  },
  {
    key: 'NightmareChallenge_12',
    name: 'Wide Awake',
    description: 'Awaken a Wayfinder to Rank 5',
    rewards: [
      'DLC_ArsenalPersona',
      'ProfileTitle_003_NM',
      'Housing_Deco_Statue_01',
      'Housing_Deco_RoseCabinet_01',
      'Dye_Special_14',
    ],
  },
  {
    key: 'NightmareChallenge_13',
    name: 'Stories in the Dark',
    description: 'Complete the Entire Main Story on Nightmare',
    rewards: [
      'GloomDagger_18',
      'ProfileTitle_002_NM',
      'Housing_Deco_RoseCouch_01',
      'Housing_Deco_RoseTable_02',
      'Housing_Deco_Chalice_02',
    ],
  },
  {
    key: 'NightmareChallenge_14',
    name: 'Savior',
    description: 'Defeat All Crucible Mythic Hunts',
    rewards: [
      'ProfileTitle_004_NM',
      'Housing_Deco_Statue_02',
      'DLC_GobStackGrnPersona',
      'DLC_GobStackKyrPersona',
      'DLC_GobStackLorPersona',
      'DLC_GobStackNisPersona',
      'DLC_GobStackSenPersona',
      'DLC_GobStackSilPersona',
      'DLC_GobStackVenPersona',
      'DLC_GobStackWinPersona',
    ],
  },
];
