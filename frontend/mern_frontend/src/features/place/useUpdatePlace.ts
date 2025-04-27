import { CommandState } from "@/features/common.ts";
import { NewPlaceFormValue } from "@/places/types.ts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import axios from "axios";
import { SERVER_URL } from "@/constants.ts";
import { stringIsNotNullOrWhiteSpace } from "@/shared/utilities.ts";

type PlaceHookReturn = {
  doCreatePlace: (newPlace: NewPlaceFormValue) => void;
  doUpdatePlace: () => void;
  commandState: CommandState;
};

export const useUpdatePlace = (): PlaceHookReturn => {
  const currentUserId = useSelector(
    (state: RootState) => state.auth.userInfo.id,
  );

  const [commandState, setCommandState] = useState<CommandState>({
    isLoading: false,
    error: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const doCreatePlace = (newPlace: NewPlaceFormValue) => {
    setCommandState({ ...commandState, isLoading: true });
    const payload = {
      title: newPlace.title,
      address: newPlace.address,
      imageUrl: newPlace.imageUrl,
      description: newPlace.description,
      location: { lat: newPlace.lat, lng: newPlace.lng },
      creator: currentUserId,
    };

    if (stringIsNotNullOrWhiteSpace(currentUserId)) {
      axios
        .post(`${SERVER_URL}/api/places/create`, payload, config)
        .then(() => {
          setCommandState({ ...commandState, isLoading: false });
        })
        .catch((e) => {
          setCommandState({ isLoading: false, error: e });
        });
    } else {
      setCommandState({ isLoading: false, error: "User not logged in" });
    }
  };

  return { commandState, doCreatePlace, doUpdatePlace: () => {} };
};
