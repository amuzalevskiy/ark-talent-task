import { BasicCoronavirusApiResponse } from "../definition/api.coronavirus";
import { addStore, createUseStoreDataHook } from "./link";

export type CoronavirusState = {
  casesByCountry: {
    [key: string]: {
      isLoaded?: boolean;
      promise?: Promise<void | BasicCoronavirusApiResponse>;
      response?: BasicCoronavirusApiResponse;
    };
  };
};

const [getState, updateState] = addStore<CoronavirusState>("coronavirus");

export const coronavirusApi = {
  getCasesByCountry: createUseStoreDataHook((countryName: string) => {
    return getState().casesByCountry[countryName]?.response?.data;
  }),
  hasCasesByCountry: createUseStoreDataHook((countryName: string) => {
    return getState().casesByCountry[countryName]?.isLoaded;
  }),
  loadCasesByCountry(
    countryName: string
  ): Promise<void | BasicCoronavirusApiResponse> {
    let promise = getState().casesByCountry[countryName]?.promise;
    if (promise) {
      return promise;
    }

    updateState((draft) => {
      draft.casesByCountry[countryName].promise = fetch("")
        .then((response) => response.json())
        .then((body) => {
          updateState((draft) => {
            draft.casesByCountry[countryName].isLoaded = true;
            draft.casesByCountry[countryName].promise = undefined;
            draft.casesByCountry[countryName].response = <
              BasicCoronavirusApiResponse
            >body;
          });
        });
    });
  },
};
