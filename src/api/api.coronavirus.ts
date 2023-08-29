// code taken form https://coronavirus.data.gov.uk/details/developers-guide/main-api#sdks
const axios = require("axios");

export type CoronavirusDataRow = {
  date: string;
  name: string;
  code: string;
  dailyCases: number | null;
  cumulativeCases: number | null;
  dailyDeaths: number | null;
  cumulativeDeaths: number | null;
};

export type GraphAPIPaginationData = {
  current: string | null;
  next: string | null;
  previous: string | null;
  first: string | null;
  last: string | null;
};

export type BasicCoronavirusApiResponse = {
  length: number;
  maxPageLimit: number;
  totalRecords: number;
  data: CoronavirusDataRow[];
  requestPayload: any; // @todo needed?
  pagination: GraphAPIPaginationData;
};

/**
 * Extracts paginated data by requesting all of the pages
 * and combining the results.
 *
 * @param filters { Array<string> }
 *          API filters. See the API documentations for additional
 *          information.
 *
 * @param structure { Object<string, any> }
 *          Structure parameter. See the API documentations for
 *          additional information.
 *
 * @returns {Promise<Array<any>>}
 *          Comprehensive list of dictionaries containing all the data for
 *          the given ``filters`` and ``structure``.
 */
export const loadCoronavirusData = async (filters, page = 1) => {
  const structure = {
    date: "date",
    name: "areaName",
    code: "areaCode",
    dailyCases: "newCasesByPublishDate",
    cumulativeCases: "cumCasesByPublishDate",
    dailyDeaths: "newDeaths28DaysByPublishDate",
    cumulativeDeaths: "cumDeaths28DaysByPublishDate",
  };
  const endpoint = "https://api.coronavirus.data.gov.uk/v1/data",
    apiParams = {
      filters: filters.join(";"),
      structure: JSON.stringify(structure),
    };
  const { data, status, statusText } = await axios.get(endpoint, {
    params: {
      ...apiParams,
      page: page,
    },
    timeout: 10000,
  });

  if (status >= 400) throw Error(statusText);

  return <BasicCoronavirusApiResponse>data;
};
