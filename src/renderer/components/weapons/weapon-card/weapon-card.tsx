import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ComponentProps } from 'react';
import { useSaveContext } from '../../../context/context';

import { getWeaponLevel } from '../utils';
import { EssentialWeaponData } from '../weapons';

type CardProps = ComponentProps<typeof Card> & {
  weapon: EssentialWeaponData;
};

export function WeaponCard({ weapon, children, ...props }: CardProps) {
  const { assetsPath } = useSaveContext();
  return (
    <Card
      className="relative w-[150px] min-h-[270px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]"
      {...props}
    >
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        {weapon.id && (
          <div className="absolute top-0 flex justify-between w-full">
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tr-none rounded-bl-none min-w-[30px] flex items-center gap-1 justify-center">
              {getWeaponLevel(weapon.currentXP)}
            </div>
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tr-none rounded-bl-none min-w-[30px] flex items-center gap-1 justify-center">
              Slots: {weapon.echoSlots.length}
            </div>
          </div>
        )}
        <img
          className="rounded-full p-[5px]"
          src={`file://${assetsPath}/${weapon.icon}.png`}
          width={60}
          alt={weapon.name}
        />
        <CardTitle className="text-md/[18px]">{weapon.name}</CardTitle>
      </CardHeader>
      <CardFooter className="w-full p-0">{children}</CardFooter>
    </Card>
  );
}
