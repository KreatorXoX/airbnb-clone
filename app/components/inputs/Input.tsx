"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export default function Input({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: Props) {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={16}
          className="text-neutral-700 absolute top-[29px] left-4"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border rounded-md outline-none transition
        disabled:opacity-70 disabled:cursor-not-allowed
   ${formatPrice ? "pl-8" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        htmlFor=""
        className={`${formatPrice ? "left-8" : "left-4"}
        ${errors[id] ? "text-rose-500" : "text-neutral-500"}
      absolute text-base transform duration-150 -translate-y-3
      top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
      `}
      >
        {label}
      </label>
    </div>
  );
}
