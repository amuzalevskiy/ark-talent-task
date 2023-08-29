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
      promise?: Promise<BasicCoronavirusApiResponse>;
      response?: BasicCoronavirusApiResponse;
    };
  };
};

// get access to the store data
const [getState, updateState] = addStore<CoronavirusState>("coronavirus");

// initialize
updateState((draft) => {
  draft.casesByNation = {};
});

// provide API
export const coronavirusApi = {
  /**
   * Returns cases filtered by specific nation if available
   */
  useCasesByNation: createUseStoreDataHook((nation: string) => {
    const cases = getState().casesByNation[nation];
    return cases?.response?.data;
  }),

  /**
   * Returns if store has data available for specific nation
   */
  useHasCasesByNation: createUseStoreDataHook((nation: string) => {
    const cases = getState().casesByNation[nation];
    return cases?.isLoaded && cases?.response?.data;
  }),

  /**
   * Loads data from third party API
   *
   * @param nation string - nation
   * @returns Promise<BasicCoronavirusApiResponse> - promise which will be resolved once data are loaded
   */
  loadCasesByNation(nation: string): Promise<BasicCoronavirusApiResponse> {
    const cases = getState().casesByNation[nation];
    let promise = cases?.promise;
    if (promise) {
      return promise;
    }

    try {
      const filters = [`areaName=${nation}`, `areaType=nation`];
      let createdPromise: Promise<BasicCoronavirusApiResponse> =
        loadCoronavirusData(filters);

      updateState((draft) => {
        let cases = draft.casesByNation[nation];
        if (!cases) {
          cases = draft.casesByNation[nation] = {};
        }

        createdPromise = cases.promise = createdPromise.then(
          (data) => {
            // call updateState again, because this happens at different time
            updateState((draft) => {
              let cases = draft.casesByNation[nation];
              cases.isLoaded = true;
              cases.isError = false;
              cases.promise = undefined;
              cases.response = data;
            });
            return data;
          },
          (e) => {
            // call updateState again, because this happens at different time
            updateState((draft) => {
              let cases = draft.casesByNation[nation];
              cases.isLoaded = true;
              cases.isError = true;
              cases.promise = undefined;
            });
            throw e;
          }
        );
      });
      return createdPromise;
    } catch (e) {
      updateState((draft) => {
        let cases = draft.casesByNation[nation];
        if (!cases) {
          cases = draft.casesByNation[nation] = {};
        }

        cases.isLoaded = true;
        cases.isError = true;
        cases.promise = undefined;
      });
      return Promise.reject(e);
    }
  },
};
