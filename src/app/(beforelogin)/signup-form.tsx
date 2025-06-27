"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { toast, Toaster } from "sonner";
import { SignupFormSchema } from "../store/lib/signup-definitions";
import { postSignup } from "../store/querys/member";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type SignupType = z.infer<typeof SignupFormSchema>;

type SignupFormProps = {
  onSwitch: () => void;
};

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>({
    resolver: zodResolver(SignupFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignupType) => {
    try {
      await postSignup(data);
      toast.success("회원가입 성공! 로그인 화면으로 이동합니다.");
      onSwitch();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다.";
      console.error(err);
      toast.error(msg);
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
            <Tooltip open={!!errors.name}>
              <TooltipTrigger asChild>
                <input
                  type='text'
                  className='rounded-xl bg-[#F2F4F6] font-medium text-base p-4 placeholder:text-[#A9A9A9] text-black'
                  placeholder='이름'
                  {...register("name")}
                />
              </TooltipTrigger>
              {errors.name && (
                <TooltipContent side='bottom'>
                  {errors.name.message}
                </TooltipContent>
              )}
            </Tooltip>

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

            <Tooltip open={!!errors.nickname}>
              <TooltipTrigger asChild>
                <input
                  type='text'
                  className='rounded-xl bg-[#F2F4F6] font-medium text-base p-4 placeholder:text-[#A9A9A9] text-black'
                  placeholder='닉네임'
                  {...register("nickname")}
                />
              </TooltipTrigger>
              {errors.nickname && (
                <TooltipContent side='bottom'>
                  {errors.nickname.message}
                </TooltipContent>
              )}
            </Tooltip>

            <div className='flex gap-4'>
              <label className='flex items-center gap-2 text-black'>
                <input
                  type='radio'
                  value='male'
                  {...register("gender")}
                  className='accent-[#217011]'
                />
                남성
              </label>
              <label className='flex items-center gap-2 text-black'>
                <input
                  type='radio'
                  value='female'
                  {...register("gender")}
                  className='accent-[#217011]'
                />
                여성
              </label>
            </div>
            {errors.gender && (
              <p className='text-sm text-red-500'>{errors.gender.message}</p>
            )}
          </div>

          <button
            className='rounded-xl bg-[#217011] text-white p-3 w-full font-bold text-xl disabled:opacity-50'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : "회원가입"}
          </button>
        </form>

        <button
          onClick={onSwitch}
          type='button'
          className='w-full rounded-xl border border-[#434343] text-[#434343] p-3 font-bold text-xl mt-4'
        >
          로그인으로 돌아가기
        </button>
      </main>
    </TooltipProvider>
  );
}
