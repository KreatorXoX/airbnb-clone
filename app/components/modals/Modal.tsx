"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  label?: string;
  secondaryLabel?: string;
};

export default function Modal({
  onClose,
  onSubmit,
  secondaryAction,
  isOpen,
  disabled,
  title,
  body,
  footer,
  label,
  secondaryLabel,
}: Props) {
  const router = useRouter();
  const path = usePathname();

  const [showModal, setShowModal] = useState(isOpen || false);

  useEffect(() => {
    setShowModal(isOpen || false);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    if (path?.includes("auth")) router.push("/");

    setShowModal(false);
    onClose();
  }, [disabled, onClose, path, router]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    setShowModal(false);
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className="justify-center items-center flex overflow-hidden inset-0 fixed z-50 outline-none focus:outline-none bg-neutral-500/70"
    >
      <motion.div
        key={label}
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto"
      >
        {/* content */}
        <div className="h-full">
          <div className="h-full lg:h-auto md:h-auto border-0 md:rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-center p-6 rounded-t relative border-b">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={20} />
              </button>
              <div className="text-lg font-medium">{title}</div>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex items-center gap-4 w-full">
                {secondaryAction && secondaryLabel && (
                  <Button
                    label={secondaryLabel}
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                <Button
                  label={label}
                  disabled={disabled}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
