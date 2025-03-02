import { CSSProperties, FC } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { API_KEY, MAP_ID } from "../../key.ts";

interface MapProps {
  key?: string;
  className?: string;
  style?: CSSProperties;
  zoom?: number;
  center: google.maps.LatLngLiteral;
}

export const MapDisplay: FC<MapProps> = ({ key, style, center, zoom }) => {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={MAP_ID}
        style={style}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      >
        <PoiMakers key={key} center={center} />
      </Map>
    </APIProvider>
  );
};

interface PoiMakersProps {
  key?: string;
  center: google.maps.LatLngLiteral;
}

const PoiMakers: FC<PoiMakersProps> = ({ key, center }) => {
  return (
    <AdvancedMarker key={key} position={center}>
      <Pin glyphColor={"#000"} borderColor={"#000"} />
    </AdvancedMarker>
  );
};
