import { addStore, createUseStoreDataHook } from "./link";

export type RightPanelState = {
  isFavourite: boolean;
};

const [getState, updateState] = addStore<RightPanelState>("rightPanel");

export const panelApi = {
  getFavourite: createUseStoreDataHook(() => getState().isFavourite),
  setFavourite(value: boolean) {
    updateState((draft) => {
      draft.isFavourite = value;
    });
  },
};
