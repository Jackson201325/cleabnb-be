"use client";

import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";

import Image from "next/image";

export type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser: User | null;
  id: string;
};

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  currentUser,
  id,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      ></Heading>
      <div className="w-full overflow-hidden rounded-xl relative h-[60vh]">
        <Image
          src={imageSrc}
          className="object-cover w-full"
          fill
          alt="image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
