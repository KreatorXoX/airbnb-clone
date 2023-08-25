"use client";

import React, { useEffect, useState } from "react";
import ReactMapGl, {
  ViewState,
  ViewStateChangeEvent,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot, FaHouse } from "react-icons/fa6";

type Props = {
  coordinates: number[];
  zoom: number;
};
export default function ShowLocationMap({ coordinates, zoom }: Props) {
  const [viewport, setViewport] = useState<Partial<ViewState>>({
    latitude: coordinates ? coordinates[0] : 44.50195139835563,
    longitude: coordinates ? coordinates[1] : -88.06002177147126,
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  });

  const onMapDrag = (evt: ViewStateChangeEvent) => {
    setViewport(evt.viewState);
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
      >
        <Marker latitude={coordinates[0]} longitude={coordinates[1]} />
      </ReactMapGl>
    </div>
  );
}
