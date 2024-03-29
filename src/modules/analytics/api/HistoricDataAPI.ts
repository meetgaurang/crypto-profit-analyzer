//import axios, { AxiosResponse } from 'axios';
import { HistoricRecord } from './HistoricDataAPI.types';

export const HistoricDataAPI = {
    // Actual API call as and when API is ready
    async getHistoricData(): Promise<HistoricRecord[]> {
        //const response: AxiosResponse<HistoricRecord[]> = await axios.get('http://localhost:4000/records');
        return [
            {
                currency: 'BTC',
                date: '20180506',
                quotes: [
                    {
                        time: '0915',
                        price: 34.98
                    },
                    {
                        time: '1045',
                        price: 36.13
                    },
                    {
                        time: '1230',
                        price: 37.01
                    },
                    {
                        time: '1400',
                        price: 35.98
                    },
                    {
                        time: '1530',
                        price: 33.56
                    }
                ]
            },
            {
                currency: 'ETC',
                date: '20180506',
                quotes: [
                    {
                        time: '0900',
                        price: 1.45
                    },
                    {
                        time: '1030',
                        price: 1.87
                    },
                    {
                        time: '1245',
                        price: 1.55
                    },
                    {
                        time: '1515',
                        price: 2.01
                    },
                    {
                        time: '1700',
                        price: 2.15
                    }
                ]
            },
            {
                currency: 'LTC',
                date: '20180506',
                quotes: [
                    {
                        time: '0930',
                        price: 14.32
                    },
                    {
                        time: '1115',
                        price: 14.21
                    },
                    {
                        time: '1245',
                        price: 13.58
                    },
                    {
                        time: '1400',
                        price: 13.06
                    }
                ]
            },
            {
                currency: 'BTC',
                date: '20180507',
                quotes: [
                    {
                        time: '0930',
                        price: 14.32
                    },
                    {
                        time: '1115',
                        price: 14.87
                    },
                    {
                        time: '1245',
                        price: 15.03
                    },
                    {
                        time: '1400',
                        price: 14.76
                    },
                    {
                        time: '1700',
                        price: 14.15
                    }
                ]
            },
            {
                currency: 'ETH',
                date: '20180507',
                quotes: [
                    {
                        time: '0910',
                        price: 1.25
                    },
                    {
                        time: '1030',
                        price: 1.87
                    },
                    {
                        time: '1245',
                        price: 1.55
                    },
                    {
                        time: '1515',
                        price: 2.01
                    },
                    {
                        time: '1710',
                        price: 2.35
                    }
                ]
            }
        ];
    }
};
