import React, { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSaveContext } from '@/src/renderer/context/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EssentialItemData } from '../housing-tab';

type CardProps = React.ComponentProps<typeof Card> & {
  item: EssentialItemData;
  isAddMode: boolean;
  onAdd: (value: number, itemKey: string) => void;
  onRemove: (value: number, itemKey: string) => void;
};

export function ItemCard({
  item,
  isAddMode,
  onAdd,
  onRemove,
  ...props
}: CardProps) {
  const { assetsPath } = useSaveContext();

  const [value, setValue] = useState(1);

  return (
    <Card
      className="relative w-[150px] min-h-[270px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]"
      {...props}
    >
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        <div className="absolute top-0 flex justify-between w-full">
          <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tr-none rounded-bl-none min-w-[30px] flex justify-center gap-1 pr-2">
            {item.total}
          </div>
          {item.isPlaced && (
            <div className=" bg-black/50 px-[5px] py-[1px] rounded-lg rounded-tl-none rounded-br-none min-w-[30px] flex justify-center gap-1">
              Placed
            </div>
          )}
        </div>
        <img
          className="rounded-full p-[5px]"
          src={`file://${assetsPath}/${item.icon}.png`}
          alt="Accessory"
          width={60}
        />
        <CardTitle className="text-md/[18px]">{item.name}</CardTitle>
      </CardHeader>

      {isAddMode && (
        <CardFooter className="w-full p-0 mb-[-13px]">
          <Input
            className="min-h-[50px] rounded-tl-none rounded-tr-none rounded-br-none"
            value={value}
            onChange={(e) =>
              setValue(Math.min(+e.currentTarget.value || 1, 50))
            }
          />
          <Button
            className="w-full min-h-[50px] rounded-lg rounded-tl-none rounded-tr-none rounded-bl-none"
            type="button"
            onClick={() => onAdd(value, item.key)}
          >
            Add
          </Button>
        </CardFooter>
      )}

      {!isAddMode && !item.isPlaced && (
        <CardFooter className="w-full p-0 mb-[-13px]">
          <Input
            className="min-h-[50px] rounded-tl-none rounded-tr-none rounded-br-none"
            value={value}
            onChange={(e) =>
              setValue(Math.min(+e.currentTarget.value || 1, item.total))
            }
          />
          <Button
            className="w-full min-h-[50px] rounded-lg rounded-tl-none rounded-tr-none rounded-bl-none"
            type="button"
            onClick={() => onRemove(value, item.key)}
          >
            Remove
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
