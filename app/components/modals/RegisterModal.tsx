"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import { useRegisterModal } from "@/app/hooks/useRegistration";
import { useLoginModal } from "@/app/hooks/useLogin";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isOpen = useRegisterModal((state) => state.isOpen);
  const registerOpen = useRegisterModal((state) => state.onOpen);
  const loginOpen = useLoginModal((state) => state.onOpen);
  const registerClose = useRegisterModal((state) => state.onClose);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerClose();
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
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
        id="name"
        type="name"
        label="Name"
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
        <div>Already have an account?</div>
        <div
          onClick={() => {
            registerClose();
            loginOpen();
          }}
          className="text-neutral-700 cursor-pointer hover:underline"
        >
          Log in
        </div>
      </div>
    </div>
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          key={"RegisterModal"}
          disabled={isLoading}
          isOpen={isOpen}
          title="Register"
          label="Continue"
          onSubmit={handleSubmit(onSubmit)}
          onClose={registerClose}
          body={bodyContent}
          footer={socialLogin}
        />
      )}
    </AnimatePresence>
  );
}
