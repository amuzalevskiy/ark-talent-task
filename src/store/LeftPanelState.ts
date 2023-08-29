import { addStore, createUseStoreDataHook } from "./link";

export type LeftPanelState = {
  isFavourite: boolean;
};

const [getState, updateState] = addStore<LeftPanelState>("leftPanel");

export const panelApi = {
  getFavourite: createUseStoreDataHook(() => getState().isFavourite),
  setFavourite(value: boolean) {
    updateState((draft) => {
      draft.isFavourite = value;
    });
  },
};
