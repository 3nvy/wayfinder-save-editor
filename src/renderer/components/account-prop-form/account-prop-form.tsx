import { useContext, useMemo } from 'react';
import { SaveEditorContext } from '../../context/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MFungibleItem } from '../../saveFileTypes';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const generateSchema = (fungibleItems: MFungibleItem[]) =>
  fungibleItems.reduce((acc, item) => {
    acc[item.name] = z.coerce
      .number()
      .min(0, {
        message: 'Minimum number is 0',
      })
      .max(999_999_999, {
        message: 'Max number is 999.999.999',
      });
    return acc;
  }, {} as any);

const generateDefaultValues = (fungibleItems: MFungibleItem[]) => {
  return fungibleItems.reduce((acc, item) => {
    acc[item.name] = item.count;
    return acc;
  }, {} as any);
};

type FormType = UseFormReturn<
  {
    [x: string]: any;
  },
  any,
  undefined
>;

type FungibleItemField = {
  form: FormType;
  property: string;
};

const FungibleItemField = ({ form, property }: FungibleItemField) => {
  return (
    <FormField
      control={form.control}
      name={property}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{property}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const AccountPropForm = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  const fungibleItems = saveStructure?.playerData?.m_InventoryData
    .m_FungibleItems as MFungibleItem[];

  const formSchema = useMemo(() => {
    return z.object(generateSchema(fungibleItems));
  }, [saveStructure]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(fungibleItems),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (saveStructure?.playerData) {
      const newFungibleItems = fungibleItems.map((item) => {
        return { ...item, count: values[item.name] };
      });

      const newSaveData = { ...saveStructure };
      if (newSaveData.playerData)
        newSaveData.playerData.m_InventoryData.m_FungibleItems =
          newFungibleItems;

      saveNewValues(newSaveData);
    }
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      <Alert>
        <AlertTitle>This section is experimental.</AlertTitle>
        <AlertDescription>
          the available items will be populated here as you unlock them in game.
          In the future I'll try to map the existing items so they are editable
          immediately.
        </AlertDescription>
      </Alert>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex w-full h-full space-y-8 flex-col mt-5 overflow-auto"
        >
          <div className="overflow-y-auto">
            {fungibleItems.map((item) => (
              <FungibleItemField
                key={item.name}
                form={form}
                property={item.name}
              />
            ))}
          </div>
          <Button className="w-full h-[50px] rounded-none" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
