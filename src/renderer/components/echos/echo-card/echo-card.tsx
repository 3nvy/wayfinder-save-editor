import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSaveContext } from '../../../context/context';

import { EssentialEchoData } from '../echos';
import {
  getCurrentCost,
  getCurrentLevel,
  getEchoColor,
  getEquipCostReduction,
} from '../utils';

type CardProps = React.ComponentProps<typeof Card> & {
  echo: EssentialEchoData;
};

export function EchoCard({ echo, children, ...props }: CardProps) {
  const { assetsPath } = useSaveContext();
  return (
    <Card
      className="relative w-[150px] min-h-[270px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]"
      {...props}
    >
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        {echo.id && (
          <div className="absolute top-0 flex justify-between w-full">
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tr-none rounded-bl-none min-w-[30px] flex items-center gap-1 pr-2">
              <img
                src={`file://${assetsPath}/EchoMenu/echoSlot_${echo.slotType}.png`}
                alt={`${echo.slotType} Slot`}
                width={20}
                height={20}
              />
              {getCurrentLevel(echo.currentXP, echo.rarity)}
            </div>
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tl-none rounded-br-none min-w-[30px] flex items-center gap-1">
              <img
                src={`file://${assetsPath}/EchoMenu/boltCapacity_icon.png`}
                alt="Echo Capacity"
                width={16}
                height={16}
              />
              {/* Applies cost reduction per level difference if echo is of Rush type */}
              {echo.type === 'E_Type'
                ? getEquipCostReduction(
                    echo.type,
                    echo.rarity,
                    getCurrentLevel(echo.currentXP, echo.rarity),
                    getCurrentLevel(echo.startingExp, echo.rarity),
                  )
                : getCurrentCost(echo.startingExp, echo.rarity, echo.type)}
            </div>
          </div>
        )}
        <img
          className="rounded-full p-[5px] bg-[var(--customBg)]"
          style={{
            '--customBg': getEchoColor(echo),
          }}
          src={`file://${assetsPath}/${echo.icon}.png`}
          alt="Echo"
          width={60}
        />
        <CardTitle className="text-md/[18px]">{echo.name}</CardTitle>
        <CardDescription>
          {echo.name?.startsWith('Trigger')
            ? 'Trigger Condition'
            : echo.details}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full p-0">{children}</CardFooter>
    </Card>
  );
}
