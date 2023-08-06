"use client";
import React, { useEffect, useState } from "react";
import ReactMapGl, { ViewState, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { FaLocationDot } from "react-icons/fa6";

type Props = {
  givenLatLng: number[];
};
export default function Map({ givenLatLng }: Props) {
  const [viewport, setViewport] = useState<Partial<ViewState>>({
    zoom: 6,
    bearing: 0,
    pitch: 0,
  });

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
    // hold the lat lng for percisely locate the home
  };
  return (
    <div className="w-full h-[40vh] md:h-[50vh] relative">
      <ReactMapGl
        reuseMaps
        {...viewport}
        minZoom={6}
        maxZoom={15}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
        mapStyle="mapbox://styles/gorkem-dev/cl96dwpib009m14l3qxut1j2j"
        onMove={(evt) => onMapDrag(evt)}
      ></ReactMapGl>
      <span className="absolute left-[45%] top-[45%]">
        <FaLocationDot className="text-rose-500" size={40} />
      </span>
    </div>
  );
}
