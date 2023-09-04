"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { useSearchFilters } from "@/app/hooks/useSearchFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import { m } from "framer-motion";
import { Country } from "@/app/hooks/useCountries";
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
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const handleSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    if (params) {
      const initialQuery = Object.fromEntries(params?.entries());

      let updatedQuery = new URLSearchParams({
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
    onClose,
    router,
    bathroomCount,
    bedCount,
    bedroomCount,
    guestCount,
    dateRange.endDate,
    dateRange.startDate,
    location?.value,
    params,
    step,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onOpen}
      title="Filters"
      label="Search"
    />
  );
}
