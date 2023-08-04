"use client";
import React, { useMemo, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence } from "framer-motion";

import { useRentalModal } from "@/app/hooks/useRent";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { categories } from "@/utils/categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelectInput from "../inputs/CountrySelectInput";

// multiple steps for rental modal

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTON = 4,
  PRICE = 5,
}

export default function RentModal() {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  // if we at the last step label is Create meaning that
  //there will be no next step but to submit
  const label = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  // if we at the first step label is undefined meaning that
  //there will be no back button
  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const rentOpen = useRentalModal((state) => state.onOpen);
  const rentClose = useRentalModal((state) => state.onClose);
  const isOpen = useRentalModal((state) => state.isOpen);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedLocation = watch("location");

  const customSetValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-10">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4 pb-2 max-h-[40vh] md:max-h-[50vh] overflow-y-auto">
        {categories.map((category) => {
          return (
            <div key={category.label} className="col-span-1">
              <CategoryInput
                onClick={(pointedCategory) =>
                  customSetValue("category", pointedCategory)
                }
                selected={selectedCategory === category.label}
                label={category.label}
                iconUrl={category.iconUrl}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelectInput
          onChange={(value) => {
            customSetValue("location", value);
          }}
          value={selectedLocation}
        />
      </div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Modal
          key={"RentModal"}
          isOpen={isOpen}
          title="Airbnb your home!"
          label={label}
          secondaryLabel={secondaryLabel}
          // no back button action on the first step
          secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
          onSubmit={onNext}
          onClose={rentClose}
          body={bodyContent}
        />
      )}
    </AnimatePresence>
  );
}
