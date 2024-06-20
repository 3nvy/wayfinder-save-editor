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

import { EssentialAccessoryData } from '../accessories';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getAccessoryLevel } from '../utils';

type EditAccessoryDialogProps = {
  accessory: EssentialAccessoryData;
  onSave: (values: any) => void;
  onClose: () => void;
};

export const EditAccessoryDialog = ({
  accessory,
  onSave,
  onClose,
}: EditAccessoryDialogProps) => {
  const formSchema = z.object({
    level: z.coerce.number().min(1).max(40, { message: '40 is the max level' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: getAccessoryLevel(accessory.currentXP),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      id: accessory.id,
      key: accessory.key,
      ...values,
    });
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{accessory.name}</DialogTitle>
              <DialogDescription>
                {accessory.id ? 'Editing Accessory' : 'Adding Accessory'}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col pt-5 pb-5 gap-3">
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
