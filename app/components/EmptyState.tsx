"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import Button from "./Button";
import Heading from "./Heading";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyState: FC<Props> = ({
  title = "No exact matches",
  subtitle = "Try ghanging or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filter"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
