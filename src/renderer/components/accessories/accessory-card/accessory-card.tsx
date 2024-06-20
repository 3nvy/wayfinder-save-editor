import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSaveContext } from '../../../context/context';

import { EssentialAccessoryData } from '../accessories';
import { getAccessoryLevel } from '../utils';

type CardProps = React.ComponentProps<typeof Card> & {
  accessory: EssentialAccessoryData;
};

export function AccessoryCard({ accessory, children, ...props }: CardProps) {
  const { assetsPath } = useSaveContext();
  return (
    <Card
      className="relative w-[150px] min-h-[270px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]"
      {...props}
    >
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        {accessory.id && (
          <div className="absolute top-0 flex justify-between w-full">
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tr-none rounded-bl-none min-w-[30px] flex items-center gap-1 justify-center">
              {getAccessoryLevel(accessory.currentXP)}
            </div>
          </div>
        )}
        <img
          className="rounded-full p-[5px]"
          src={`file://${assetsPath}/${accessory.icon}.png`}
          width={60}
        />
        <CardTitle className="text-md/[18px]">{accessory.name}</CardTitle>
        <CardDescription className="flex flex-col">
          {accessory.attributes.map((attr) => (
            <span>{attr}</span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full p-0">{children}</CardFooter>
    </Card>
  );
}
