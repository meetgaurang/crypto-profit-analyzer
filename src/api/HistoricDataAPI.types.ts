import { string } from "prop-types"

export interface IHistoricDataAPIResponse {
    records: IHistoricRecord[];
}

export interface IHistoricRecord {
    currency: string;
    date: string;
    quotes: IQuote[];
}

export interface IQuote {
    time: string;
    price: number;
}