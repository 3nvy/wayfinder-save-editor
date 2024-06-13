import { ECHO_DATA, ECHO_LEVEL_INCREMENT } from '../../tables/echos';
import { EssentialEchoData } from './echos';

export const getEchoColor = (echo: EssentialEchoData) => {
  const echoRarity = echo.rarity;
  return ECHO_DATA[echoRarity].color;
};

export const getCurrentLevel = (echo: EssentialEchoData) => {
  const currentXp = echo.currentXP;
  const initialXp = ECHO_DATA[echo.rarity].initialXP;
  const remainingXP = Math.max(currentXp - initialXp, 0);
  const firstLevel = currentXp < initialXp ? 0 : 1;
  const levels = Math.ceil(remainingXP / ECHO_LEVEL_INCREMENT);
  return 1 + firstLevel + levels;
};
