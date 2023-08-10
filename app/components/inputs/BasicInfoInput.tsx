"use client";
import React, { useCallback, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
type Props = {
  value: number;
  onChange: (value: number) => void;
  title: string;
  subtitle: string;
  canBeZero?: boolean;
};

export default function BasicInfoInput({
  value,
  title,
  subtitle,
  onChange,
  canBeZero,
}: Props) {
  const reduceHandler = useCallback(() => {
    if (canBeZero && value === 0) {
      return;
    }
    if (!canBeZero && value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange, canBeZero]);

  const increaseHandler = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  return (
    <div
      className="border-b last:border-none py-8 flex items-center justify-between
    text-neutral-800
    "
    >
      <div className="relative w-full">
        <p className="text-xl font-light">{title}</p>
        <span className="text-xs absolute w-full -bottom-4 text-neutral-500 left-0">
          {subtitle}
        </span>
      </div>
      <div className="flex gap-4 items-center select-none">
        <button
          disabled={value === 0 || (!canBeZero && value === 1)}
          onClick={reduceHandler}
          className="p-2 border disabled:cursor-not-allowed hover:border-gray-600 transition border-gray-400 rounded-full
          disabled:border-none
          "
        >
          <FaMinus
            size={10}
            className={`${
              value === 0 || (!canBeZero && value === 1)
                ? "text-neutral-300"
                : ""
            }`}
          />
        </button>
        <span>{value}</span>
        <button
          onClick={increaseHandler}
          className="p-2 border hover:border-gray-600 transition border-gray-400 rounded-full"
        >
          <FaPlus size={10} />
        </button>
      </div>
    </div>
  );
}
