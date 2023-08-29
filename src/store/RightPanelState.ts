import { addStore, createUseStoreDataHook } from "./link";

export type RightPanelState = {
  isFavourite: boolean;
};

// get access to the store data
const [getState, updateState] = addStore<RightPanelState>("rightPanel");

// initialize
updateState((draft) => {
  draft.isFavourite = false;
});

// provide API
export const panelApi = {
  useIsFavourite: createUseStoreDataHook(() => getState().isFavourite),
  setFavourite(value: boolean) {
    updateState((draft) => {
      draft.isFavourite = value;
    });
  },
};
