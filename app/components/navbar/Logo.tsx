// We can only use useRouter in the client side
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer mr-16"
      height="43"
      width="100"
      src="/images/airbnb.png"
    />
  );
};

export default Logo;
