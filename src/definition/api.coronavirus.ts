export type CoronavirusDataRow = {
    date: string,
    name: string,
    code: string,
    newCasesByPublishDate: number,
    cumCasesByPublishDate: number,
    newDeaths28DaysByPublishDate: number|null,
    cumDeaths28DaysByPublishDate: number|null
}

export type GraphAPIPaginationData = {
    current: string|null,
    next: string|null,
    previous: string|null,
    first: string|null,
    last: string|null,
}

export type BasicCoronavirusApiResponse = {
    length: number,
    maxPageLimit: number,
    totalRecords: number,
    data: CoronavirusDataRow[],
    requestPayload: any, // @todo
    pagination: GraphAPIPaginationData
}