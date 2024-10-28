/**
 * Convert Exp into Level
 */

export const weaponLevelCurve = [
  0, 375, 1212, 3029, 5538, 8827, 12981, 18087, 24231, 31500, 39981, 49760,
  60923, 72837, 87000, 100215, 114660, 130380, 147420, 165000, 186450, 208800,
  232943, 258945, 285938, 317340, 351120, 387368, 426173, 466538, 501742.5,
  539087.4, 576432.3, 613777.1875, 651122.1, 688467, 725811.9, 763156.8,
];

export const getWeaponLevel = (xp: number) => {
  const levelCurveNumber = weaponLevelCurve.reduce((acc, levelExp, idx) => {
    if (levelExp <= xp) {
      return idx;
    }
    return acc;
  }, 0);

  return levelCurveNumber + 1;
};

export const getWeaponExpFromLevel = (level: number) => {
  return weaponLevelCurve[level - 1] ?? 0;
};
