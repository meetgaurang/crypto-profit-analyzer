import { Quote } from '../../api/HistoricDataAPI.types';

export interface DateWiseRecord {
    date: string;
    profitList: ProfitRecord[];
}
export interface ProfitRecord {
    currency?: string;
    buyDetails?: Quote;
    sellDetails?: Quote;
    profit?: number;
}
