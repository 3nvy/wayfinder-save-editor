export type HardcoreChallengeProps = {
  key: string;
  name: string;
  description: string;
  rewards: string[];
};

export const HARDCORE_CHALLENGES: HardcoreChallengeProps[] = [
  {
    key: 'HardcoreChallenge_01',
    name: 'Survivor',
    description: 'Level Any Wayfinder to 30 in Hardcore',
    rewards: ['ProfileTitle_010_HC', 'Housing_Deco_RoseTableLamp_01'],
  },
  {
    key: 'HardcoreChallenge_02',
    name: 'Looks Like We Made It',
    description: 'Level All Wayfinders to 30 in a Single Hardcore Run',
    rewards: ['ProfileTitle_009_HC', 'Housing_Deco_RoseTable_02'],
  },
  {
    key: 'HardcoreChallenge_03',
    name: "Journey's End",
    description: 'Complete the Entire Main Story in Hardcore',
    rewards: [
      'GloomDagger_001B',
      'ProfileTitle_008_HC',
      'Housing_Deco_RoseCouch_01',
    ],
  },
  {
    key: 'HardcoreChallenge_04',
    name: 'Seeker',
    description: 'Defeat All Optional, Non-Story Bosses in Hardcore',
    rewards: [
      'ProfileTitle_007_HC',
      'DLC_GoblinArcherPersona',
      'Housing_Deco_RoseCabinet_01',
    ],
  },
  {
    key: 'HardcoreChallenge_05',
    name: 'Answered the Call',
    description: 'Unlock All Wayfinders',
    rewards: [
      'DLC_VengePersona',
      'Housing_Deco_RoseTeapot_01',
      'Housing_Deco_RoseTeacup_01',
    ],
  },
  {
    key: 'HardcoreChallenge_06',
    name: 'Badge of the Aurelian',
    description: 'Defeat All Aurelian Bosses',
    rewards: ['ProfileTitle_014_HC', 'DLC_BrotherMaganPersona'],
  },
  {
    key: 'HardcoreChallenge_07',
    name: 'Badge of the Deep',
    description: 'Defeat All Bosses of the Deep',
    rewards: ['ProfileTitle_012_HC', 'DLC_RangerDavynPersona'],
  },
  {
    key: 'HardcoreChallenge_08',
    name: 'Badge of Frost',
    description: 'Defeat All Reaver Woods Bosses',
    rewards: ['ProfileTitle_015_HC', 'DLC_WillowWitchPersona'],
  },
  {
    key: 'HardcoreChallenge_09',
    name: 'Badge of Growth',
    description: 'Defeat All Crucible Bosses',
    rewards: ['ProfileTitle_011_HC', 'DLC_KestrelPersona'],
  },

  {
    key: 'HardcoreChallenge_10',
    name: 'Frostmarch Sentinel',
    description: 'Complete Patrols in Frostmarch',
    rewards: ['DLC_GoblinHackerPersona', 'Housing_Deco_RoseTable_01'],
  },
  {
    key: 'HardcoreChallenge_11',
    name: 'Wilds Surveyor',
    description: 'Complete Patrols in the Crucible',
    rewards: ['DLC_WardenHassPersona', 'Housing_Deco_RoseTeacup_01'],
  },

  {
    key: 'HardcoreChallenge_12',
    name: 'Savior',
    description: 'Defeat All Crucible Mythic Hunts',
    rewards: ['ProfileTitle_013_HC', 'DLC_TofuGrnPersona'],
  },
];
