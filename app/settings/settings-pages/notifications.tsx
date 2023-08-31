import { useForm } from 'react-hook-form';
import React from 'react';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { UserWithSettings } from '@/lib/types/types';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

type Props = {
  user: UserWithSettings;
};

type FormValues = z.infer<typeof FormSchema>;

const FormSchema = z.object({
  pushNotifications: z.boolean().default(false).optional(),
  emailNotifications: z.boolean().default(false).optional(),
});

export default function NotificationsPage(props: Props) {
  const form = useForm<FormValues>({
    defaultValues: {
      pushNotifications: props.user.settings.pushNotifications,
      emailNotifications: props.user.settings.emailNotifications,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(data: FormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(props.user.settings, null, 2)}
          </code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Enable email notifications</FormLabel>
                <FormDescription>
                  You will only be sent an email once a week for each task that
                  is due. Make sure to check your spam folder if you have not
                  received any emails and you have enabled this setting.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pushNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Enable push notifications</FormLabel>
                <FormDescription>
                  You will be notified once a day in the morning (your local
                  time) with all of your tasks for the day.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
