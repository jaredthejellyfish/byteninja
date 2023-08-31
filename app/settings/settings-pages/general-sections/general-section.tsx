import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { DefaultValuesType, SectionInfoType } from '../general';
import { Separator } from '@/components/ui/separator';
import { ExtendedUser } from '@/lib/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type GeneralSectionProps = {
  info: SectionInfoType;
  user: ExtendedUser;
  disabled: boolean;
  onSubmit: (e: DefaultValuesType) => void;
};

export default function GeneralSection(props: GeneralSectionProps) {
  const { info, disabled, user, onSubmit } = props;

  const defaultValues: DefaultValuesType = useMemo(() => {
    return {
      [info.id]: user[info.id]!,
    } as DefaultValuesType;
  }, [info.id, user]);

  const { register, handleSubmit, setValue, watch } =
    useForm<DefaultValuesType>({
      defaultValues,
    });

  useEffect(() => {
    setValue(info.id, defaultValues[info.id]);
  }, [defaultValues, setValue, info.id]);

  return (
    <div className="border rounded-lg dark:bg-neutral-900/40 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="p-5">
          <h3 className="mb-2 text-xl font-semibold">{info.title}</h3>
          <p className="text-sm pb-1 text-neutral-400">{info.description}</p>
          <Input
            placeholder={info.placeholder}
            {...register(info.id)}
            className="max-w-[650px]"
          />
        </div>
        <Separator className="w-full h-[1px] bg-neutral-200 dark:bg-zinc-800" />
        <div className="flex flex-row items-center justify-between px-5 py-2">
          <span className="text-xs sm:text-sm text-neutral-400">
            {info.secondaryDescription}
          </span>
          <Button
            variant={'ghost'}
            disabled={watch(info.id) === user[info.id] || disabled}
            className="p-0 px-4 border border-neutral-200 dark:border-neutral-700"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
