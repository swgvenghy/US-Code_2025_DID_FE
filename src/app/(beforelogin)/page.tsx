"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className='w-dvw h-dvh flex justify-center items-center relative'>
      <Image src='/images/login-background.png' alt='background images' fill />
      <div className='z-10'>
        {isSignup ? (
          <SignupForm onSwitch={() => setIsSignup(false)} />
        ) : (
          <LoginForm onSwitch={() => setIsSignup(true)} />
        )}
      </div>
    </div>
  );
}
