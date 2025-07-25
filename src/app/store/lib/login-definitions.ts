import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "유효한 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (val.length < 8) {
        ctx.addIssue({ code: "custom", message: "8자 이상이어야 합니다." });
      }
      if (!/[a-zA-Z]/.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: "영문자를 최소 1개 포함하세요.",
        });
      }
      if (!/[0-9]/.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: "숫자를 최소 1개 포함하세요.",
        });
      }
    }),
});

export type FormFieldKeys = keyof z.infer<typeof LoginFormSchema>;

export type FormState =
  | {
      errors?: Record<FormFieldKeys, string[]>;
      message?: string;
    }
  | undefined;
