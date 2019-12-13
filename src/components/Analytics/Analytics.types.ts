import {IQuote} from "../../api/HistoricDataAPI.types";


export interface IDateWiseRecord {
    date: string;
    profitList: IProfitRecord[];
}
export interface IProfitRecord {
    currency?: string;
    buyDetails?: IQuote;
    sellDetails?: IQuote;
    profit?: number;
}
