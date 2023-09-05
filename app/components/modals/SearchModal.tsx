"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useSearchFilters } from "@/app/hooks/useSearchFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import Map from "../Map";
import { Country } from "@/app/hooks/useCountries";
import Heading from "../Heading";
import CountrySelectInput from "../inputs/CountrySelectInput";
import DatePicker from "../inputs/DatePicker";
import BasicInfoInput from "../inputs/BasicInfoInput";
type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal({}: Props) {
  const { onClose, onOpen, isOpen } = useSearchFilters();

  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<Country>();
  const [bedroomCount, setBedroomCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [guestCount, setGuestCount] = useState(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    if (params) {
      const initialQuery = Object.fromEntries(params?.entries());

      const updatedQuery = new URLSearchParams({
        ...initialQuery,
        location: location?.value || "",
        bedroomCount: bedroomCount.toString(),
        bedCount: bedCount.toString(),
        bathroomCount: bathroomCount.toString(),
        guestCount: guestCount.toString(),
      });

      if (dateRange.startDate) {
        updatedQuery.set("startDate", dateRange.startDate.toISOString());
      }
      if (dateRange.endDate) {
        updatedQuery.set("endDate", dateRange.endDate.toISOString());
      }

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}?${updatedQuery}`;

      setStep(STEPS.LOCATION);
      onClose();
      router.push(url);
    }
  }, [
    onNext,
    onClose,
    router,
    bathroomCount,
    bedCount,
    bedroomCount,
    guestCount,
    dateRange,
    location?.value,
    params,
    step,
  ]);

  const label = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-10">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelectInput
        onChange={(value) => {
          setLocation((prev) => (prev = value));
        }}
        value={location}
      />
      <hr />
      {location && (
        <Map
          givenLatLng={location?.countryLatLng}
          givenZoom={location?.zoom}
          staticMap
        />
      )}
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title="When do you want to go?"
          subtitle="Make sure everyone is free!"
        />
        <DatePicker
          value={dateRange}
          onChange={(value) => setDateRange((prev) => (prev = value.selection))}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <div>
          <BasicInfoInput
            title="Guests"
            subtitle="How many guest are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <BasicInfoInput
            title="Bedrooms"
            subtitle="How many bedrooms do you need?"
            value={bedroomCount}
            onChange={(value) => setBedroomCount(value)}
          />
          <BasicInfoInput
            title="Beds"
            subtitle="How many beds do you need?"
            value={bedCount}
            onChange={(value) => setBedCount(value)}
          />

          <BasicInfoInput
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryAction={STEPS.LOCATION ? undefined : onBack}
      secondaryLabel={secondaryLabel}
      title="Filters"
      label={label}
      body={bodyContent}
    />
  );
}
