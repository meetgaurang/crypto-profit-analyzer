export interface HistoricRecord {
    currency: string;
    date: string;
    quotes: Quote[];
}

export interface Quote {
    time?: string;
    price?: number;
}
