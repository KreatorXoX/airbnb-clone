"use client";
import React, { useMemo, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence } from "framer-motion";

import { useRentalModal } from "@/app/hooks/useRent";

import Modal from "./Modal";
import Heading from "../Heading";
import Map from "../Map";
import { categories } from "@/utils/categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelectInput from "../inputs/CountrySelectInput";
import { Country } from "@/app/hooks/useCountries";
import BasicInfoInput from "../inputs/BasicInfoInput";
import ImageUploader from "../inputs/ImageUploader";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";

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
      bedroomCount: 1,
      bedCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedLocation: Country = watch("location");
  const selectedGuestCount = watch("guestCount");
  const selectedBedroomCount = watch("bedroomCount");
  const selectedBedCount = watch("bedCount");
  const selectedBathroomCount = watch("bathroomCount");
  const selectedImage = watch("imageSrc");

  const customSetValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    if (id.includes("location") && !id.includes("zoom"))
      toast.success(
        `${id.split(".")[0].toString().toUpperCase()} is confirmed`
      );
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
        {selectedLocation && (
          <Map
            onChangingLocation={(location: number[], zoom: number) => {
              customSetValue("location.countryLatLng", location);
              customSetValue("location.zoom", zoom);
            }}
            givenLatLng={selectedLocation?.countryLatLng}
            givenZoom={selectedLocation?.zoom}
          />
        )}
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title="Share some basics about your place"
          subtitle="You will add more details later."
        />
        <div>
          <BasicInfoInput
            title="Guests"
            subtitle="How many guest is allowed?"
            value={selectedGuestCount}
            onChange={(value) => customSetValue("guestCount", value)}
          />
          <BasicInfoInput
            title="Bedrooms"
            subtitle="How many bedrooms do you have?"
            value={selectedBedroomCount}
            onChange={(value) => customSetValue("bedroomCount", value)}
            canBeZero
          />
          <BasicInfoInput
            title="Beds"
            subtitle="How many beds do you have?"
            value={selectedBedCount}
            onChange={(value) => customSetValue("bedCount", value)}
          />

          <BasicInfoInput
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={selectedBathroomCount}
            onChange={(value) => customSetValue("bathroomCount", value)}
          />
        </div>
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title="Add some photos of your place"
          subtitle="Show guests what you place looks like!"
        />
        <ImageUploader
          value={selectedImage}
          onChange={(value) => customSetValue("imageSrc", value)}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTON) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <div className="flex flex-col gap-5 items-center justify-center">
          <Input
            id="title"
            label="Title"
            type="text"
            errors={errors}
            required
            register={register}
          />

          <Input
            id="description"
            label="Description"
            type="text"
            errors={errors}
            required
            register={register}
          />
        </div>
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <div className="flex flex-col gap-5 items-center justify-center">
          <Input
            id="price"
            label="Price"
            type="text"
            errors={errors}
            required
            register={register}
            formatPrice
          />
        </div>
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
