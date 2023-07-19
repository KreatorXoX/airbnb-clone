"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

type Props = {
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  body?: React.ReactElement;
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
  label,
  secondaryLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    onClose();
  }, [disabled, onClose]);

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
    <>
      <div
        onClick={handleClose}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 fixed z-50 outline-none focus:outline-none bg-neutral-500/70"
      >
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto">
          {/* content */}
          <div
            className={`
            ${showModal ? "translate-y-0" : "translate-y-full"} 
            ${showModal ? "opacity-100" : "opacity-0"}
            translate duration-300 h-full`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 md:rounded-lg shadow-md relative flex flex-col w-full bg-white outline-none focus:outline-none">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
