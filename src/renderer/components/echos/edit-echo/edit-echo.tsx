import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { generateCostTable, getCurrentCost, getCurrentLevel } from '../utils';
import { EssentialEchoData } from '../echos';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ECHO_BUDGET_COST } from '@/src/renderer/tables/echos';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EchoRarity } from '@/src/renderer/saveFileTypes';

type EditEchoDialogProps = {
  echo: EssentialEchoData;
  onSave: (values: any) => void;
  onClose: () => void;
};

export const EditEchoDialog = ({
  echo,
  onSave,
  onClose,
}: EditEchoDialogProps) => {
  const echoCostData =
    ECHO_BUDGET_COST[echo.type as keyof typeof ECHO_BUDGET_COST];
  const costEntryNumber = Math.ceil(echoCostData.cap / echoCostData.increment);

  const [currentSelectedRarity, setCurrentSelectedRarity] = useState(
    echo.rarity,
  );

  const formSchema = useMemo(() => {
    return z.object({
      level: z.coerce
        .number()
        .min(1)
        .max(50, { message: '50 is the max level' }),
      cost: z.string(),
      rarity: z.string(),
    });
  }, [echo]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: getCurrentLevel(echo.currentXP, echo.rarity),
      cost: Math.min(
        getCurrentLevel(echo.startingExp, echo.rarity),
        40,
      ).toString(),
      rarity: echo.rarity,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      id: echo.id,
      key: echo.key,
      ...values,
    });
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{echo.name}</DialogTitle>
              <DialogDescription>
                {echo.id ? 'Editing Echo' : 'Adding Echo'}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col pt-5 pb-5 gap-3">
              {/* Rarity Select */}
              <FormField
                control={form.control}
                name="rarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rarity</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        setCurrentSelectedRarity(value as EchoRarity);
                        return field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select desired rarity for echo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Common">Common</SelectItem>
                        <SelectItem value="Uncommon">Uncommon</SelectItem>
                        <SelectItem value="Rare">Rare</SelectItem>
                        <SelectItem value="Epic">Epic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Level Select */}
              <FormField
                control={form.control}
                name={'level'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Equip Cost Select */}
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equip Cost</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select echo cost" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {generateCostTable(
                          echo.type,
                          currentSelectedRarity,
                        ).map((cost, idx) => {
                          return (
                            <SelectItem value={`${idx + 1}`}>
                              {cost} (Lvl {idx + 1}
                              {idx + 1 === costEntryNumber ? '+' : ''})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="sm:justify-start">
              <Button type="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
