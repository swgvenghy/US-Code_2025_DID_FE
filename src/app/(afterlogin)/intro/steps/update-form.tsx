"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface UpdateFormInterface<TFormData extends FieldValues> {
  children: ReactNode;
  onSubmit: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}

const UpdateForm = <TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions,
}: UpdateFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default UpdateForm;
