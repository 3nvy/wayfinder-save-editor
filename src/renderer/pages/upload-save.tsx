import { Separator } from '@/components/ui/separator';
import FileChooser from '../components/file-chooser/file-chooser';

export const UploadSavePage = () => {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center flex-col space-y-10">
      <div>
        <div className="space-y-1">
          <h4 className="text-md font-medium leading-none">Wayfinder</h4>
          <p className="text-sm text-muted-foreground">Save Editor</p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <FileChooser />
        </div>
      </div>
    </div>
  );
};
