import { addStore, createUseStoreDataHook } from "./link";

export type LeftPanelState = {
  isFavourite: boolean;
};

// get access to the store data
const [getState, updateState] = addStore<LeftPanelState>("leftPanel");

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
