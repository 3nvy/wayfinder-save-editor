import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { getCurrentLevel } from '../utils';
import { EssentialEchoData, InventoryEchoType } from '../echos';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EchoRarity, SaveData } from '@/src/renderer/saveFileTypes';
import { ECHO_DATA } from '@/src/renderer/tables/echos';
import { SaveEditorContext } from '@/src/renderer/context/context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);
  const formSchema = useMemo(() => {
    return z.object({
      level: z.coerce
        .number()
        .min(1)
        .max(50, { message: '50 is the max level' }),
      rarity: z.string(),
    });
  }, [echo]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: getCurrentLevel(echo),
      rarity: echo.rarity,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      id: echo.id,
      key: echo.key,
      ...values,
    });
    // const { rawEchoData, ...newEcho } = echo;
    // const newStructure = { ...saveStructure } as SaveData;

    // const remainingNonFungibleItems =
    //   newStructure.playerData.m_InventoryData.m_NonFungibleItems.filter(
    //     (item) => item.iD !== echo.iD,
    //   );

    // /**
    //  * Set New XP
    //  */
    // const initialXP = ECHO_DATA[values.rarity as EchoRarity].initialXP;
    // newEcho.spec.itemSpec.currentExp =
    //   values.level === 1 ? 0 : initialXP + 54 * Math.max(0, values.level - 2);

    // /**
    //  * Set New Rarity
    //  */
    // newEcho.spec.itemSpec.echoRarity = values.rarity as EchoRarity;

    // newStructure.playerData.m_InventoryData.m_NonFungibleItems = [
    //   ...remainingNonFungibleItems,
    //   newEcho,
    // ];

    // saveNewValues(newStructure);
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
              <FormField
                control={form.control}
                name="rarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rarity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
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
