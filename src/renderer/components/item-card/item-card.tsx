import React from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSaveContext } from '../../context/context';
import { CURRENCIES } from '../../tables/currency';

type CardProps = React.ComponentProps<typeof Card> & {
  item: (typeof CURRENCIES)[0];
};

export function ItemCard({ item, children, ...props }: CardProps) {
  const { assetsPath } = useSaveContext();
  return (
    <Card
      className="w-[150px] min-h-[240px] flex flex-col items-center pb-3 shadow-[11px_1px_35px_#00000052,0_0px_25px_#00000038,0_10px_10px_#0000002d,0_5px_5px_#00000024,0_3px_3px_#00000019]"
      {...props}
    >
      <CardHeader className="flex items-center text-center justify-center flex-1 p-4">
        <img
          src={`file://${assetsPath}/${item.icon}.png`}
          alt={item.key}
          width={50}
        />
        <CardTitle className="text-md/[18px]">{item.localizedString}</CardTitle>
      </CardHeader>
      <CardFooter className="p-4">{children}</CardFooter>
    </Card>
  );
}
