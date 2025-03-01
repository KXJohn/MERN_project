import { CSSProperties, FC } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

interface MapProps {
  className?: string;
  style?: CSSProperties;
  zoom?: number;
  center: google.maps.LatLngLiteral;
}

const API_KEY = "AIzaSyAjUhKAw3JF9UYz4cedFeMNB2RL7m1aiGU";

export const MapDisplay: FC<MapProps> = ({ style, center, zoom }) => {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={style}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      />
    </APIProvider>
  );
};
