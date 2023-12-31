import { UserSettings } from '@prisma/client';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
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
import useMutateUserSettings from '@/hooks/useMutateUserSettings';
import { UserWithSettings } from '@/lib/types/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

type FormValues = z.infer<typeof FormSchema>;

const FormSchema = z.object({
  pushNotifications: z.boolean().default(false).optional(),
  emailNotifications: z.boolean().default(false).optional(),
});

function NotificationsPage(props: { user: UserWithSettings }) {
  const { mutateUserSettings, isLoading } = useMutateUserSettings();

  const form = useForm<FormValues>({
    defaultValues: {
      pushNotifications: props.user.settings.pushNotifications,
      emailNotifications: props.user.settings.emailNotifications,
    },
  });

  function onSubmit(data: FormValues) {
    const updatedSettings: Partial<UserSettings> = {
      ...data,
    };
    mutateUserSettings({ id: props.user.id, settings: updatedSettings });
  }

  return (
    <Form {...form}>
      <h3 className="text-xl">Notification Settings</h3>
      <p className="mt-2 mb-3 text-sm text-neutral-400 lg:w-3/4">
        Configure the notification settings for your account on this page to
        tailor your experience to your preferences.
      </p>
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
        <Button
          type="submit"
          disabled={
            isLoading ||
            (form.watch('emailNotifications') ===
              props.user.settings.emailNotifications &&
              form.watch('pushNotifications') ===
                props.user.settings.pushNotifications)
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default dynamic(() => Promise.resolve(NotificationsPage));
