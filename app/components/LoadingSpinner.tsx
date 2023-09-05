"use client";
import React from "react";
import { RingLoader } from "react-spinners";
type Props = {};

export default function LoadingSpinner({}: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <RingLoader size={120} color="red" />
    </div>
  );
}
