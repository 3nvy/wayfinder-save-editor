import { useContext, useMemo } from 'react';
import { SaveEditorContext } from '../../context/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { InventoryItemField } from '../forms/inventory-form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ExperimentalTab = () => {
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);

  const formSchema = useMemo(() => {
    return z.object({
      bigApartment: z.boolean().default(false).optional(),
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bigApartment:
        saveStructure?.playerData?.m_HousingData.m_HouseDefinition.rowName ===
        'Apartment_01_Large',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (saveStructure?.playerData) {
      const newSaveStructure = { ...saveStructure };

      if (newSaveStructure.playerData) {
        debugger;
        newSaveStructure.playerData.m_HousingData.m_HouseDefinition.rowName =
          values['bigApartment'] ? 'Apartment_01_Large' : 'Apartment_01';

        newSaveStructure.playerData.m_HousingData.m_ApartmentManifest.lotInfo[0].houseDefinition.rowName =
          values['bigApartment'] ? 'Apartment_01_Large' : 'Apartment_01';

        saveNewValues(newSaveStructure);
      }
    }
  }

  const data = [
    {
      key: 'bigApartment',
      localizedString: 'Unlock Big Apartment',
      icon: 'Icons/T_UI_MissingTextureIcon',
    },
  ] as any;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-h-full h-full"
      >
        <Alert>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Attention!</AlertTitle>
          <AlertDescription>
            These features are experimental and may cause bugs. Use at your own
            risk!
          </AlertDescription>
        </Alert>
        <div className="flex flex-wrap items-center gap-5 h-full overflow-auto justify-center w-full pt-[10px] pb-[20px]">
          {/* Experience Field */}
          <InventoryItemField form={form as any} item={data[0]} />
        </div>
        <Button className="w-full h-[50px] rounded-none" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
