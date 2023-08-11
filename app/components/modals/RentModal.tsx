"use client";
import React, { useMemo, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { AiOutlineHome } from "react-icons/ai";
import { BsDoorOpen } from "react-icons/bs";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { toast } from "react-hot-toast";

import { useRentalModal } from "@/app/hooks/useRent";
import { categories } from "@/utils/categories";
import { amenities } from "@/utils/amenities";
import { ListingPlace } from "@/types";

import Modal from "./Modal";
import Heading from "../Heading";
import Map from "../Map";

import CategoryInput from "../inputs/CategoryInput";
import CountrySelectInput from "../inputs/CountrySelectInput";
import BasicInfoInput from "../inputs/BasicInfoInput";
import ImageUploader from "../inputs/ImageUploader";
import Input from "../inputs/Input";
import PlaceTypeInput from "../inputs/PlaceTypeInput";
import AmenityInput from "../inputs/AmenityInput";

// multiple steps for rental modal

enum STEPS {
  CATEGORY = 0,
  TYPE = 1,
  LOCATION = 2,
  INFO = 3,
  AMENITIES = 4,
  IMAGES = 5,
  DESCRIPTON = 6,
  PRICE = 7,
}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

type KeysOfListPlace<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, KeysOfListPlace<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

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
  } = useForm<ListingPlace>({
    defaultValues: {
      category: "",
      type: "entire",
      location: null,
      guestCount: 1,
      bedroomCount: 1,
      bedCount: 1,
      bathroomCount: 1,
      amenities: null,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedType = watch("type");
  const selectedLocation = watch("location");
  const selectedGuestCount = watch("guestCount");
  const selectedBedroomCount = watch("bedroomCount");
  const selectedBedCount = watch("bedCount");
  const selectedBathroomCount = watch("bathroomCount");
  const selectedAmenities = watch("amenities");
  const selectedImage = watch("imageSrc");
  const selectedTitle = watch("title");
  const selectedDescription = watch("description");
  const selectedPrice = watch("price");
  console.log(selectedAmenities);
  const customSetValue = (
    id: Partial<KeysOfListPlace<ListingPlace>>,
    value: any
  ) => {
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
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-3 md:grid-cols-2 gap-4 pb-2 max-h-[60vh] md:max-h-[50vh] overflow-y-auto no-scrollbar">
        {categories.map((category) => {
          return (
            <div key={category.label} className="col-span-1">
              <CategoryInput
                onClick={(value) => customSetValue("category", value)}
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

  if (step === STEPS.TYPE) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading title="What type of place will guests have?" subtitle="" />
        <PlaceTypeInput
          value="entire"
          title="An entire place"
          subtitle="Guests have the whole place to themselves"
          icon={AiOutlineHome}
          onClick={(value) => customSetValue("type", value)}
          selected={selectedType === "entire"}
        />
        <PlaceTypeInput
          value="room"
          title="A room"
          subtitle="Guests have their own room in a home, plus access to shared spaces."
          icon={BsDoorOpen}
          onClick={(value) => customSetValue("type", value)}
          selected={selectedType === "room"}
        />
        <PlaceTypeInput
          value="shared"
          title="A Shared room"
          subtitle="Guests sleep in a room or common area that may be shared with you or others"
          icon={LiaUserFriendsSolid}
          onClick={(value) => customSetValue("type", value)}
          selected={selectedType === "shared"}
        />
      </div>
    );
  }
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
  if (step === STEPS.AMENITIES) {
    bodyContent = (
      // <div className="flex flex-col gap-10">
      //   <Heading
      //     title="Tell guests what your place has to offer"
      //     subtitle="Select the ones applies to your place"
      //   />
      // </div>
      <div className="flex flex-col gap-10">
        <Heading
          title="Tell guests what your place has to offer"
          subtitle="Select the ones applies to your place"
        />
        <div className="grid grid-cols-3 md:grid-cols-2 gap-4 pb-2 max-h-[40vh] md:max-h-[50vh] overflow-y-auto ">
          {amenities.map((amenity) => {
            return (
              <div key={amenity.label} className="col-span-1">
                <AmenityInput
                  onClick={(value) => customSetValue("amenities", value)}
                  // selected={
                  //   selectedAmenities
                  // }
                  label={amenity.label}
                  id={amenity.id}
                  iconUrl={amenity.iconUrl}
                />
              </div>
            );
          })}
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
