/**
 * Convert Exp into Level
 */
export const getAccessoryLevel = (xp: number) => {
  return Math.min(1 + xp, 40);
};
