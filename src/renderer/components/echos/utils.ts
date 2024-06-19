import { EchoRarity } from '../../saveFileTypes';
import {
  ECHO_BUDGET_COST,
  ECHO_DATA,
  ECHO_LEVEL_INCREMENT,
  EchoBudgetProperties,
} from '../../tables/echos';
import { EssentialEchoData } from './echos';

/**
 * Get the color associated to an echo rarity
 */
export const getEchoColor = (echo: EssentialEchoData) => {
  const echoRarity = echo.rarity;
  return ECHO_DATA[echoRarity].color;
};

/**
 * Get the level of an echo
 */
export const getCurrentLevel = (xp: number, rarity: EchoRarity) => {
  const currentXp = xp;
  const initialXp = ECHO_DATA[rarity].initialXP;
  const remainingXP = Math.max(currentXp - initialXp, 0);
  const firstLevel = currentXp < initialXp ? 0 : 1;
  const levels = Math.ceil(remainingXP / ECHO_LEVEL_INCREMENT);
  return 1 + firstLevel + levels;
};

/**
 * Get the cost of an echo
 */
export const getCurrentCost = (
  xp: number,
  rarity: EchoRarity,
  type: string,
) => {
  const startingExp = xp;
  const initialXp = ECHO_DATA[rarity].initialXP;
  const echoCostData = ECHO_BUDGET_COST[
    type as keyof typeof ECHO_BUDGET_COST
  ] as EchoBudgetProperties;

  const scalingValue = echoCostData?.rarityScale?.[rarity] ?? 1;
  const steps = echoCostData.increment * scalingValue;

  const remainingXP = Math.max(startingExp - initialXp, 0);
  const firstLevel = (startingExp < initialXp ? 0 : 1) * steps;
  const levels = Math.ceil(remainingXP / ECHO_LEVEL_INCREMENT) * steps;

  return Math.floor(
    Math.min(
      +(steps + firstLevel + levels).toFixed(2),
      echoCostData.cap * scalingValue,
    ),
  );
};

export const convertCostToExp = (rarity: EchoRarity, cost: number) => {
  if (cost === 1) {
    return 0;
  } else if (cost === 2) {
    return ECHO_DATA[rarity].initialXP;
  } else {
    return ECHO_DATA[rarity].initialXP + (cost - 2) * ECHO_LEVEL_INCREMENT;
  }
};

export const generateCostTable = (type: string, rarity: EchoRarity) => {
  const echoCostData = ECHO_BUDGET_COST[
    type as keyof typeof ECHO_BUDGET_COST
  ] as EchoBudgetProperties;

  const scalingValue = echoCostData?.rarityScale?.[rarity] ?? 1;

  return Array(40)
    .fill(0)
    .map(
      (_, idx) =>
        +(echoCostData.increment * scalingValue * (idx + 1)).toFixed(2),
    )
    .map((i) => Math.floor(i));
};
