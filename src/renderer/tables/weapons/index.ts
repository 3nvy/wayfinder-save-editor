import { TwoHandedAxe } from './2HAxe';
import { TwoHandedScythes } from './2HScythe';
import { TwoHandedSwords } from './2HSwords';
import { DualWieldDaggers } from './DWItems';
import { TwoHandedMace } from './MaceItems';
import { TwoHandedRifle } from './RifleItems';
import { SwordAndShield } from './SnSItems';

const WEAPONS = [
  ...TwoHandedScythes,
  ...TwoHandedSwords,
  ...TwoHandedAxe,
  ...DualWieldDaggers,
  ...TwoHandedMace,
  ...TwoHandedRifle,
  ...SwordAndShield,
];

export { WEAPONS };
