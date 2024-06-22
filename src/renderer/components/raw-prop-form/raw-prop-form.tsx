import { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';
import { SaveEditorContext } from '../../context/context';

export const RawPropForm = () => {
  const { toast } = useToast();
  const { saveStructure, saveNewValues } = useContext(SaveEditorContext);
  const [parsedStructure, setParsedStructure] = useState('');

  useEffect(() => {
    if (saveStructure)
      setParsedStructure(JSON.stringify(saveStructure, null, 2));
  }, [saveStructure]);

  const saveNewStructure = useCallback(() => {
    try {
      const parseStructure = JSON.parse(parsedStructure);
      saveNewValues(parseStructure);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to save structure',
        description: err.message,
      });
    }
  }, [parsedStructure, saveNewValues, toast]);

  return (
    <div className="flex flex-col gap-5 h-full">
      <Alert>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Attention!</AlertTitle>
        <AlertDescription>
          This is the raw structure of the save file. This contains all the
          information that may not be mapped on the other sections. Feel free to
          edit but make sure you know what you are doing, or you may break your
          save file!
        </AlertDescription>
      </Alert>
      <Textarea
        className="flex-1"
        placeholder="Type your message here."
        value={parsedStructure}
        onChange={(evt) => setParsedStructure(evt.currentTarget.value)}
      />
      <Button className="h-[50px]" onClick={saveNewStructure}>
        Save
      </Button>
    </div>
  );
};
