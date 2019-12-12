

export interface IDateWiseRecord {
    date: string;
    profitList: IProfitRecord[];
}
export interface IProfitRecord {
    currency?: string;
    buyPrice?: number;
    buyTime?: string;
    sellPrice?: number;
    sellTime?: string;
    profit?: number
}