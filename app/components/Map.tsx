"use client";
import React, { useEffect, useState } from "react";
import ReactMapGl, { ViewState, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { FaLocationDot, FaHouse } from "react-icons/fa6";

type Props = {
  givenLatLng: number[];
};
export default function Map({ givenLatLng }: Props) {
  const [viewport, setViewport] = useState<Partial<ViewState>>({
    zoom: 6,
    bearing: 0,
    pitch: 0,
  });

  const [isMoving, setIsMoving] = useState<boolean>(false);

  useEffect(() => {
    setViewport((prev) => {
      return {
        ...prev,
        latitude: givenLatLng ? givenLatLng[0] : 51.4934,
        longitude: givenLatLng ? givenLatLng[1] : 0.0098,
      };
    });
  }, [givenLatLng]);

  const onMapDrag = (evt: ViewStateChangeEvent) => {
    setViewport(evt.viewState);
    setIsMoving(true);
    // hold the lat lng for percisely locate the home
  };

  return (
    <div className="w-full h-[40vh] md:h-[50vh] relative">
      <span className="absolute italic top-0 left-0 z-10 bg-gray-800/70 py-1 px-2 rounded-lg text-white font-bold border-none outline-none">
        Zoom in to your property&apos;s location
      </span>
      <ReactMapGl
        reuseMaps
        {...viewport}
        minZoom={6}
        maxZoom={15}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
        mapStyle="mapbox://styles/gorkem-dev/cl96dwpib009m14l3qxut1j2j"
        onMove={(evt) => onMapDrag(evt)}
        onMoveEnd={() => setIsMoving(false)}
      ></ReactMapGl>
      <div className="absolute left-[45%] top-[45%] z-10 flex flex-col">
        <div className="relative">
          <div
            className={`absolute top-0 duration-300 ${
              isMoving ? "-top-3" : ""
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
    </div>
  );
}
