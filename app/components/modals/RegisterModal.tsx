"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import { useRegisterModal } from "@/app/hooks/useRegistration";
import Modal from "./Modal";

export default function RegisterModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isOpen = useRegisterModal((state) => state.isOpen);
  const registerOpen = useRegisterModal((state) => state.onOpen);
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
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      label="Continue"
      onSubmit={handleSubmit(onSubmit)}
      onClose={registerClose}
    />
  );
}
