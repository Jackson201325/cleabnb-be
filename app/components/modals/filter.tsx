"use client";

import Calendar from "@/app/components/inputs/Calendar";
import useFilterModal from "@/app/hooks/useFilterModal";
import { initialDateRange } from "@/app/listing/[listingId]/ListingClient";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";

import Heading from "../Heading";
import Counter from "../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Modal from "./Modal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const Filter = () => {
  const filterModal = useFilterModal();
  const params = useSearchParams();
  const router = useRouter();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  // const [category, setCategory] = useState(null)
  // const [priceRange, setPriceRange] = useState([0, 1000])

  //   currentRef: filterRef,
  //   callbackFunc: filterModal.close,
  // };

  // onClose={filterModal.close}
  // useOutsideClick(outsideClick);

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

  const onBack = useCallback(() => {
    if (step === STEPS.LOCATION) return;

    setStep((value) => value - 1);
  }, [step]);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentParams = {};

    if (params) {
      currentParams = qs.parse(params.toString());
    }

    const updatedParams = {
      ...currentParams,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
      startDate:
        dateRange && dateRange.startDate
          ? dateRange.startDate.toISOString()
          : "",
      endDate:
        dateRange && dateRange.endDate ? dateRange.endDate.toISOString() : "",
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedParams,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);
    filterModal.close();
    router.push(url);
  }, [
    bathroomCount,
    dateRange,
    filterModal,
    guestCount,
    location,
    onNext,
    params,
    roomCount,
    router,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Apply filters";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you wanna go"
          subtitle="Find the perfect date!"
        />
        <Calendar
          value={dateRange}
          onChange={(dateRange) => setDateRange(dateRange.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms?"
          value={roomCount}
          onChange={() => setRoomCount}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={filterModal.isOpen}
      onClose={filterModal.close}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};

export default Filter;
