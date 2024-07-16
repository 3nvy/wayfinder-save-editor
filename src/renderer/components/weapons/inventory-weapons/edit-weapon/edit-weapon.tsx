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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useSaveContext } from '@/src/renderer/context/context';
import { getWeaponLevel } from '../../utils';
import { EssentialWeaponData } from '../inventory-weapons';

type EditWeaponDialogProps = {
  weapon: EssentialWeaponData;
  onSave: (values: any) => void;
  onClose: () => void;
};

// eslint-disable-next-line import/prefer-default-export
export function EditWeaponDialog({
  weapon,
  onSave,
  onClose,
}: EditWeaponDialogProps) {
  const { assetsPath } = useSaveContext();

  const [echoSlots, setEchoSlots] = useState([...weapon.echoSlots]);

  const formSchema = z.object({
    level: z.coerce.number().min(1).max(38, { message: '38 is the max level' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: getWeaponLevel(weapon.currentXP),
    },
  });

  const onAddSlotHandle = () => {
    setEchoSlots((state) => [
      ...state,
      {
        // eslint-disable-next-line no-unsafe-optional-chaining
        initialIdx: state[state.length - 1]?.initialIdx + 1 || 0,
        name: 'Alfa',
        isEquipped: false,
      },
    ]);
  };

  const onSlotTypeChange = (slotIdx: number, newType: string) => {
    if (newType === 'delete') {
      setEchoSlots((state) => {
        const newState = [...state];
        newState.splice(slotIdx, 1);
        return newState;
      });
    } else {
      setEchoSlots((state) => {
        const newState = [...state];
        newState[slotIdx] = { ...newState[slotIdx], name: newType };
        return newState;
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      id: weapon.id,
      key: weapon.key,
      echoSlots,
      ...values,
    });
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{weapon.name}</DialogTitle>
              <DialogDescription>
                {weapon.id ? 'Editing Weapon' : 'Adding Weapon'}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col pt-5 pb-5 gap-3">
              {/* Level Select */}
              <FormField
                control={form.control}
                name="level"
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

              <FormLabel>
                Echo Slots (Equipped slots can&apos;t be modified)
              </FormLabel>
              <div className="flex flex-row flex-wrap gap-3">
                {echoSlots.map((slot, idx) => (
                  <div className="relative">
                    <Select
                      disabled={slot.isEquipped}
                      defaultValue={slot.name}
                      value={slot.name}
                      onValueChange={(value) => onSlotTypeChange(idx, value)}
                    >
                      <SelectTrigger className="min-w-[100px]">
                        <SelectValue placeholder="Select a slot type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alfa">
                          <div className="flex flex-row items-center p-0">
                            <img
                              src={`file://${assetsPath}/EchoMenu/echoSlot_Alfa.png`}
                              alt="Attack Slot"
                              width={25}
                              height={25}
                            />
                            <span className="pr-[5px]">Attack</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Bravo">
                          <div className="flex flex-row items-center p-0">
                            <img
                              src={`file://${assetsPath}/EchoMenu/echoSlot_Bravo.png`}
                              alt="Guard Slot"
                              width={25}
                              height={25}
                            />
                            <span className="pr-[5px]">Guard</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Charlie">
                          <div className="flex flex-row items-center p-0">
                            <img
                              src={`file://${assetsPath}/EchoMenu/echoSlot_Charlie.png`}
                              alt="Balance Slot"
                              width={25}
                              height={25}
                            />
                            <span className="pr-[5px]">Balance</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Delta">
                          <div className="flex flex-row items-center p-0">
                            <img
                              alt="Cross Slot"
                              src={`file://${assetsPath}/EchoMenu/echoSlot_Delta.png`}
                              width={25}
                              height={25}
                            />
                            <span className="pr-[5px]">Cross</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Echo">
                          <div className="flex flex-row items-center p-0">
                            <img
                              alt="Rush Slot"
                              src={`file://${assetsPath}/EchoMenu/echoSlot_Echo.png`}
                              width={25}
                              height={25}
                            />
                            <span className="pr-[5px]">Rush</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="delete">Remove</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="text-[20px]"
                  onClick={onAddSlotHandle}
                >
                  +
                </Button>
              </div>
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
}
