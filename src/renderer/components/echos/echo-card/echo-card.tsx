import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSaveContext } from '../../../context/context';

import { EssentialEchoData } from '../echos';
import { getCurrentCost, getCurrentLevel, getEchoColor } from '../utils';

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
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tr-none rounded-bl-none min-w-[30px]">
              {getCurrentLevel(echo.currentXP, echo.rarity)}
            </div>
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tl-none rounded-br-none min-w-[30px]">
              {getCurrentCost(echo.startingExp, echo.rarity, echo.type)}
            </div>
          </div>
        )}
        <img
          className="rounded-full p-[5px] bg-[var(--customBg)]"
          style={{
            '--customBg': getEchoColor(echo),
          }}
          src={`file://${assetsPath}/${echo.icon}.png`}
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
