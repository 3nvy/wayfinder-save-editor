import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSaveContext } from '@/src/renderer/context/context';
import { EssentialItemData } from '../housing-tab';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type CardProps = React.ComponentProps<typeof Card> & {
  item: EssentialItemData;
  onAdd: (value: number, itemKey: string) => void;
};

export function ItemCard({ item, onAdd, children, ...props }: CardProps) {
  const { assetsPath } = useSaveContext();

  const [value, setValue] = useState(1);

  return (
    <Card
      className="relative w-[150px] min-h-[270px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]"
      {...props}
    >
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        <img
          className="rounded-full p-[5px]"
          src={`file://${assetsPath}/${item.icon}.png`}
          width={60}
        />
        <CardTitle className="text-md/[18px]">{item.name}</CardTitle>
      </CardHeader>
      {!item.id && (
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
    </Card>
  );
}
