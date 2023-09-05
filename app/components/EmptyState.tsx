"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};
export default function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of the filter ",
  showReset,
}: Props) {
  const router = useRouter();
  return (
    <div
      className="
  min-h-screen flex flex-col gap-2 justify-center items-center
  "
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
}
