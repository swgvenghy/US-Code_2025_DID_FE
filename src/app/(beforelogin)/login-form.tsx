"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { LoginFormSchema } from "../store/lib/login-definitions";
import { postLogin } from "../store/querys/member";
import { setToken } from "../utils/token/set-token";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type LoginType = z.infer<typeof LoginFormSchema>;

type LoginFormProps = {
  onSwitch: () => void;
};
export default function LoginForm({ onSwitch }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginType) => {
    try {
      const { accessToken, refreshToken } = await postLogin(data);
      setToken({ name: "accessToken", value: accessToken });
      localStorage.setItem("refreshToken", refreshToken);
      toast.success("로그인 성공!");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.";
      console.error(msg);
      toast.error("로그인 중 오류가 발생하였습니다.");
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <main className='p-17 bg-white font-pretendard rounded-4xl w-full'>
        <Toaster position='top-center' richColors />

        <Image
          className='pb-[60px]'
          width={235}
          height={135}
          src='/images/logo2.png'
          alt='writeLogo'
        />

        <form onSubmit={handleSubmit(onSubmit)} className='mb-10 w-full'>
          <div className='flex flex-col gap-3 mb-6'>
            <Tooltip open={!!errors.email}>
              <TooltipTrigger asChild>
                <input
                  type='email'
                  className='rounded-xl bg-[#F2F4F6] font-medium text-base p-4 placeholder:text-[#A9A9A9] text-black'
                  placeholder='이메일'
                  {...register("email")}
                />
              </TooltipTrigger>
              {errors.email && (
                <TooltipContent side='bottom'>
                  {errors.email.message}
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip open={!!errors.password}>
              <TooltipTrigger asChild>
                <input
                  type='password'
                  className='rounded-xl bg-[#F2F4F6] font-medium text-base p-4 placeholder:text-[#A9A9A9] text-black'
                  placeholder='비밀번호'
                  {...register("password")}
                />
              </TooltipTrigger>
              {errors.password && (
                <TooltipContent side='bottom'>
                  {errors.password.message}
                </TooltipContent>
              )}
            </Tooltip>
          </div>

          <button
            className='rounded-xl bg-[#217011] text-white p-3 w-full font-bold text-xl disabled:opacity-50'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : "다음"}
          </button>
        </form>

        <button
          onClick={onSwitch}
          type='button'
          className='w-full rounded-xl border border-[#434343] text-[#434343] p-3 font-bold text-xl mt-4'
        >
          새로운 계정 만들기
        </button>
      </main>
    </TooltipProvider>
  );
}
