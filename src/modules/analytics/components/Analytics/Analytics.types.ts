import { Quote } from '../../api/HistoricDataAPI.types';
import { AnalyticsStore } from '../../store/types';

export interface AnalyticsProps extends AnalyticsStore {
    getHistoricData: Function;
}

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
