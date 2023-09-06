"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMapGl, {
  Marker,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot, FaHouse } from "react-icons/fa6";
import { MapListing } from "@/types";
import Image from "next/image";

type Props = {
  onChangingLocation?: (location: number[], zoom: number) => void;
  givenLatLng?: number[];
  givenZoom?: number;
  staticMap?: boolean;
  listingLocations?: MapListing[];
  fullHeight?: boolean;
};
export default function Map({
  givenLatLng,
  givenZoom,
  onChangingLocation,
  staticMap,
  listingLocations,
  fullHeight,
}: Props) {
  const [viewport, setViewport] = useState<Partial<ViewState>>({
    latitude: givenLatLng ? givenLatLng[0] : 44.50195139835563,
    longitude: givenLatLng ? givenLatLng[1] : -88.06002177147126,
    zoom: givenZoom,
    bearing: 0,
    pitch: 0,
  });

  const router = useRouter();

  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [listingInfo, setListingInfo] = useState<MapListing>();

  useEffect(() => {
    if (givenLatLng) {
      setViewport((prev) => {
        return {
          ...prev,
          latitude: givenLatLng.at(0),
          longitude: givenLatLng.at(1),
        };
      });
    }
  }, [givenLatLng]);

  const onMapDrag = (evt: ViewStateChangeEvent) => {
    if (staticMap) {
      return setViewport(evt.viewState);
    }
    setViewport(evt.viewState);
    setIsMoving(true);
  };

  return (
    <div
      className={`w-full ${
        fullHeight ? "h-[40vh] sm:h-[70vh]" : "h-[40vh] md:h-[50vh]"
      } relative`}
    >
      {!staticMap && (
        <>
          <span
            className="text-sm absolute italic left-0 top-0 z-10 bg-gray-800/70 py-1 px-2 rounded-lg text-white font-bold border-none outline-none
      "
          >
            Zoom in to your property&apos;s location
          </span>
          <button
            onClick={() =>
              onChangingLocation?.(
                [viewport.latitude!, viewport.longitude!],
                viewport.zoom ? viewport.zoom : 10
              )
            }
            className="text-sm absolute bottom-0 left-0 z-10 bg-green-600 py-1 px-2 rounded-lg text-white font-bold border-none outline-none
        hover:bg-green-500 focus:bg-green-600 transition 
        "
          >
            Click to confirm location
          </button>
        </>
      )}
      <ReactMapGl
        reuseMaps
        {...viewport}
        minZoom={6}
        maxZoom={15}
        style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
        mapStyle="mapbox://styles/gorkem-dev/cl96dwpib009m14l3qxut1j2j"
        onMove={(evt) => onMapDrag(evt)}
        onMoveEnd={
          staticMap
            ? undefined
            : () => {
                setIsMoving(false);
              }
        }
      >
        {staticMap && givenLatLng && !listingLocations && (
          <Marker
            latitude={givenLatLng[0]}
            longitude={givenLatLng[1]}
            color="rgb(244 63 94)"
          />
        )}
        {staticMap &&
          givenLatLng &&
          listingLocations &&
          listingLocations.map((listing) => {
            return (
              <div key={listing.id}>
                <Marker
                  latitude={listing.location.lat}
                  longitude={listing.location.lng}
                  scale={0.75}
                  color="rgb(244 63 94)"
                  onClick={() => {
                    setListingInfo({
                      id: listing.id,
                      location: {
                        lat: listing.location.lat,
                        lng: listing.location.lng,
                      },
                      title: listing.title,
                      price: listing.price,
                      imageUrl: listing.imageUrl,
                    });
                  }}
                />
                {listingInfo && (
                  <div className="relative">
                    <div className=" min-w-[12rem] w-[30vw] absolute top-0 z-20">
                      <div className="flex flex-col justify-center items-center">
                        <div
                          className="cursor-pointer 
                          hover:bg-rose-500 hover:text-white transition
                          text-rose-500 bg-white rounded-full p-3 text-xs relative"
                          onClick={() => setListingInfo(undefined)}
                        >
                          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            x
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            router.push(`/listings/${listingInfo.id}`);
                          }}
                          className="
                          cursor-pointer
                          bg-slate-300/20 w-full h-full flex flex-col justify-center gap-2 px-2 py-1"
                        >
                          <p className="truncate">{listingInfo.title}</p>
                          <span>$ {listingInfo.price.toFixed(2)}</span>
                          <div className="relative h-[10rem]">
                            <Image
                              alt="listingImage"
                              src={listingInfo.imageUrl}
                              fill
                              sizes="100vw"
                              className="object-center object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </ReactMapGl>
      {!staticMap && (
        <div className="absolute left-[45%] top-[45%] z-10 flex flex-col">
          <div className="relative">
            <div
              className={`absolute duration-300 ${
                isMoving ? "-top-3" : "top-0"
              }`}
            >
              <FaLocationDot
                enableBackground={1}
                className="text-rose-500"
                size={40}
              />
              <FaHouse
                className="absolute left-3 top-2 text-slate-200 bg-rose-500"
                size={16}
              />
            </div>
          </div>
          <div className="relative">
            <span
              className={`
            absolute -z-10 top-7 left-1 w-8 h-8 bg-gray-500/60 rounded-full rotate-[38deg] -skew-y-[27deg] -skew-x-[27deg] transform-gpu
            duration-300
            ${isMoving ? " scale-[0.65]" : ""}
            `}
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}
