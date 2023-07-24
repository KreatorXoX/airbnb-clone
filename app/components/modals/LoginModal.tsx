"use client";
import React, { useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRegisterModal } from "@/app/hooks/useRegistration";
import { useLoginModal } from "@/app/hooks/useLogin";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const isOpen = useLoginModal((state) => state.isOpen);
  const loginOpen = useLoginModal((state) => state.onOpen);
  const loginClose = useLoginModal((state) => state.onClose);

  const registerOpen = useRegisterModal((state) => state.onOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Login successful");
        loginClose();
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your account" />
      <Input
        id="email"
        type="email"
        label="Email"
        errors={errors}
        required
        register={register}
        disabled={isLoading}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        errors={errors}
        required
        register={register}
        disabled={isLoading}
      />
    </div>
  );
  const socialLogin = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="flex flex-row justify-center items-center gap-2 text-neutral-500 text-center mt-4 font-light">
        <div>Create new account?</div>
        <div
          onClick={() => {
            loginClose();
            registerOpen();
          }}
          className="text-neutral-700 cursor-pointer hover:underline"
        >
          Sign up
        </div>
      </div>
    </div>
  );
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Modal
          key={"LoginModal"}
          disabled={isLoading}
          isOpen={isOpen}
          title="Login"
          label="Continue"
          onSubmit={handleSubmit(onSubmit)}
          onClose={loginClose}
          body={bodyContent}
          footer={socialLogin}
        />
      )}
    </AnimatePresence>
  );
}
