import {
  BasicCoronavirusApiResponse,
  loadCoronavirusData,
} from "../api/api.coronavirus";
import { addStore, createUseStoreDataHook } from "./link";

export type CoronavirusState = {
  casesByNation: {
    [key: string]: {
      isLoaded?: boolean;
      isError?: boolean;
      promise?: Promise<void | BasicCoronavirusApiResponse>;
      response?: BasicCoronavirusApiResponse;
    };
  };
};

const [getState, updateState] = addStore<CoronavirusState>("coronavirus");
updateState((draft) => {
  draft.casesByNation = {};
});

export const coronavirusApi = {
  useCasesByNation: createUseStoreDataHook((nation: string) => {
    const cases = getState().casesByNation[nation];
    return cases?.response?.data;
  }),
  
  useHasCasesByNation: createUseStoreDataHook((nation: string) => {
    const cases = getState().casesByNation[nation];
    return cases?.isLoaded;
  }),

  loadCasesByNation(
    nation: string
  ): Promise<void | BasicCoronavirusApiResponse> {
    const cases = getState().casesByNation[nation];
    let promise = cases?.promise;
    if (promise) {
      return promise;
    }

    updateState((draft) => {
      let cases = draft.casesByNation[nation];
      if (!cases) {
        cases = draft.casesByNation[nation] = {};
      }

      const filters = [`areaName=${nation}`, `areaType=nation`];
      try {
        cases.promise = loadCoronavirusData(filters).then(
          (data) => {
            updateState((draft) => {
              let cases = draft.casesByNation[nation];
              cases.isLoaded = true;
              cases.isError = false;
              cases.promise = undefined;
              cases.response = data;
            });
          },
          () => {
            updateState((draft) => {
              let cases = draft.casesByNation[nation];
              cases.isLoaded = true;
              cases.isError = true;
              cases.promise = undefined;
            });
          }
        );
      } catch (e) {
        cases.isLoaded = true;
        cases.isError = true;
        cases.promise = undefined;
      }
    });
  },
};
