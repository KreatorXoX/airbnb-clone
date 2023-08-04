"use client";
import LoginModal from "@/app/components/modals/LoginModal";
import { useLoginModal } from "@/app/hooks/useLogin";
import React, { useEffect } from "react";

export default function LoginPage() {
  const loginOpen = useLoginModal((state) => state.onOpen);
  useEffect(() => {
    loginOpen();
  }, [loginOpen]);
  return <LoginModal />;
}
