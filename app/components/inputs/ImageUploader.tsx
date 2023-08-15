"use client";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default function ImageUploader({ onChange, value }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="i6al9wr9"
        options={{ maxFiles: 1, maxImageFileSize: 10000000, folder: "airbnb" }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="relative flex flex-col justify-center items-center cursor-pointer border border-neutral-300 rounded-lg p-20
              hover:opacity-70 transition text-neutral-700
              space-y-2
              "
            >
              <TbPhotoPlus size={40} />
              <span>Click to upload</span>
              {value && (
                <div className="absolute inset-2 top-0 bg-white">
                  <Image
                    alt="uploaded image"
                    fill
                    sizes="33vw"
                    style={{ objectFit: "cover" }}
                    src={value}
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
