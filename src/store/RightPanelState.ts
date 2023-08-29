import { addStore, createUseStoreDataHook } from "./link";

export type RightPanelState = {
  isFavourite: boolean;
};

const [getState, updateState] = addStore<RightPanelState>("rightPanel");
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
