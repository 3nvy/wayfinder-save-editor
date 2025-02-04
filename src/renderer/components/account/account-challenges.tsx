import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  Form,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useSaveContext } from '../../context/context';
import { NIGHTMARE_CHALLENGES } from '../../tables/nightmare-challenges';
import { ItemCard } from '../item-card/item-card';
import DLC_ITEMS from '../../tables/dlc-items';
import { HARDCORE_CHALLENGES } from '../../tables/hardcore-challenges';

type ChallengeType = 'Nightmare' | 'Hardcore';
type AccountChallengesProps = {
  type: ChallengeType;
};

export const AccountChallenges = ({ type }: AccountChallengesProps) => {
  const { saveStructure, saveNewMetaValues }: any = useSaveContext();

  const CHALLENGES =
    type === 'Hardcore' ? HARDCORE_CHALLENGES : NIGHTMARE_CHALLENGES;

  const unlockedChallenges = useMemo(
    () =>
      saveStructure?.CompletedChallenges?.Properties?.map((cc: any) =>
        cc.Properties[1].Property.replace('\x00', ''),
      ) ?? [],
    [saveStructure],
  );

  const formSchema = useMemo(() => {
    return z.object(
      CHALLENGES.reduce<{ [key: string]: z.ZodBoolean }>((acc, chlg) => {
        acc[chlg.key] = z.boolean();
        return acc;
      }, {}),
    );
  }, [CHALLENGES]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: CHALLENGES.reduce<{ [key: string]: boolean }>(
      (acc, chlg) => {
        acc[chlg.key] = unlockedChallenges.includes(chlg.key);
        return acc;
      },
      {},
    ),
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const newSaveStructure = JSON.parse(JSON.stringify(saveStructure));

      const complementaryChallengeEntries =
        newSaveStructure.CompletedChallenges.Properties.filter((p: any) =>
          p.Properties.some((pp: any) => !pp.Property.startsWith(type)),
        );
      const challengeEntries = Object.entries(values).reduce((acc, [k, v]) => {
        if (v) {
          acc.push({
            Name: 'DataTableRowHandle\x00',
            Type: 'Tuple',
            Properties: [
              {
                Name: 'DataTable\x00',
                Type: 'ObjectProperty\x00',
                Property: `/Game/Data/Quests/Achievements/${type}_Challenge_Quests.${type}_Challenge_Quests\x00`,
              },
              {
                Name: 'RowName\x00',
                Type: 'NameProperty\x00',
                Property: `${k}\x00`,
              },
            ],
          });

          // Handle Hidden Nightmare Challenge
          if (k === 'NightmareChallenge_14' && v) {
            acc.push({
              Name: 'DataTableRowHandle\x00',
              Type: 'Tuple',
              Properties: [
                {
                  Name: 'DataTable\x00',
                  Type: 'ObjectProperty\x00',
                  Property:
                    '/Game/Data/Quests/Achievements/Nightmare_Challenge_Quests.Nightmare_Challenge_Quests\x00',
                },
                {
                  Name: 'RowName\x00',
                  Type: 'NameProperty\x00',
                  Property: 'Hidden_Nightmare_GoblinStackReward\x00',
                },
              ],
            });
          }

          // Handle Hidden Hardcore Challenge
          if (k === 'HardcoreChallenge_12' && v) {
            acc.push({
              Name: 'DataTableRowHandle\x00',
              Type: 'Tuple',
              Properties: [
                {
                  Name: 'DataTable\x00',
                  Type: 'ObjectProperty\x00',
                  Property:
                    '/Game/Data/Quests/Achievements/Hardcore_Challenge_Quests.Hardcore_Challenge_Quests\x00',
                },
                {
                  Name: 'RowName\x00',
                  Type: 'NameProperty\x00',
                  Property: 'Hidden_Hardcore_TofuBlockReward\x00',
                },
              ],
            });
          }
        }
        return acc;
      }, [] as any);

      debugger;
      newSaveStructure.CompletedChallenges = {
        Name: 'CompletedChallenges\x00',
        Type: 'StructProperty\x00',
        StoredPropertyType: 'DataTableRowHandle\x00',
        Properties: [...complementaryChallengeEntries, ...challengeEntries],
      };

      saveNewMetaValues(newSaveStructure);
    },
    [saveNewMetaValues, saveStructure, type],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-h-full gap-10 justify-between h-full"
      >
        <Accordion
          type="single"
          collapsible
          className="w-full overflow-auto p-5"
        >
          {CHALLENGES.map((challenge) => (
            <AccordionItem value={challenge.key}>
              <AccordionTrigger>
                <p>
                  <b>{challenge.name}</b> -{' '}
                  <small>{challenge.description}</small>
                </p>
              </AccordionTrigger>
              <AccordionContent className="flex gap-3 flex-col p-5 pt-0">
                <FormField
                  control={form.control}
                  name={challenge.key}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Unlock</FormLabel>
                        <FormDescription>
                          Unlock this challenge account wide
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-5 flex-wrap">
                  {challenge.rewards.map((reward) => {
                    const item = DLC_ITEMS.find((i) => i.key === reward)!;
                    return <ItemCard item={item} className="min-h-[200px]" />;
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button className="w-full min-h-[50px] rounded-none mt-4" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};
