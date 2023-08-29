import { addStore, createUseStoreDataHook } from "./link";

export type LeftPanelState = {
  isFavourite: boolean;
};

const [getState, updateState] = addStore<LeftPanelState>("leftPanel");
updateState((draft) => {
  draft.isFavourite = false;
});

export const panelApi = {
  useIsFavourite: createUseStoreDataHook(() => getState().isFavourite),
  setFavourite(value: boolean) {
    updateState((draft) => {
      draft.isFavourite = value;
    });
  },
};
