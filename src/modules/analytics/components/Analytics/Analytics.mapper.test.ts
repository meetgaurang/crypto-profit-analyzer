import { AnalyticsMapper } from './Analytics.mapper';
import { HistoricDataAPIResponse, HistoricRecord } from '../../api/HistoricDataAPI.types';
import { DateWiseRecord } from './Analytics.types';

describe('AnalyticsMapper', () => {
    let mapper: AnalyticsMapper;
    beforeAll(() => {
        mapper = new AnalyticsMapper();
    });

    describe('mapResponse', () => {
        it('will map daily records', () => {
            const response: HistoricDataAPIResponse = {
                records: [
                    {
                        currency: 'BTC',
                        date: '20180507',
                        quotes: [
                            { time: '0900', price: 1.0 },
                            { time: '1000', price: 2.0 },
                        ],
                    },
                    {
                        currency: 'ETC',
                        date: '20180507',
                        quotes: [
                            { time: '0900', price: 1.0 },
                            { time: '1000', price: 2.0 },
                        ],
                    },
                    {
                        currency: 'LTC',
                        date: '20180507',
                        quotes: [
                            { time: '0900', price: 1.0 },
                            { time: '1000', price: 2.0 },
                        ],
                    },
                    {
                        currency: 'BTC',
                        date: '20180506',
                        quotes: [
                            { time: '0900', price: 1.0 },
                            { time: '1000', price: 2.0 },
                        ],
                    },
                ],
            };

            const records: DateWiseRecord[] = mapper.mapResponse(response.records);
            expect(records.length).toEqual(2);
            expect(records[0].date).toEqual('20180507');
            expect(records[0].profitList.length).toEqual(3);
            expect(records[1].date).toEqual('20180506');
            expect(records[1].profitList.length).toEqual(1);
        });
    });

    describe('mapEachRecord', () => {
        it('will handle less value at the bottom', () => {
            const input: HistoricRecord = {
                currency: 'BTC',
                date: '20180507',
                quotes: [
                    { time: '0915', price: 34.98 },
                    { time: '1045', price: 36.13 },
                    { time: '1230', price: 37.01 },
                    { time: '1400', price: 35.98 },
                    { time: '1530', price: 33.56 },
                ],
            };
            const output = mapper.mapEachRecord(input);
            expect(output).toEqual({
                currency: 'BTC',
                buyDetails: {
                    price: 34.98,
                    time: '0915',
                },
                sellDetails: {
                    price: 37.01,
                    time: '1230',
                },
                profit: 2.03,
            });
        });

        it('will handle spike at the bottom', () => {
            const input: HistoricRecord = {
                currency: 'BTC',
                date: '20180507',
                quotes: [
                    { time: '0915', price: 34.98 },
                    { time: '1045', price: 36.13 },
                    { time: '1230', price: 37.01 },
                    { time: '1400', price: 35.98 },
                    { time: '1530', price: 33.56 },
                    { time: '1600', price: 31.56 },
                    { time: '1630', price: 34.56 },
                ],
            };
            const output = mapper.mapEachRecord(input);
            expect(output).toEqual({
                currency: 'BTC',
                buyDetails: {
                    price: 31.56,
                    time: '1600',
                },
                sellDetails: {
                    price: 34.56,
                    time: '1630',
                },
                profit: 3.0,
            });
        });

        it('will mark profit as undefined if prices only decreased that day', () => {
            const input: HistoricRecord = {
                currency: 'BTC',
                date: '20180507',
                quotes: [
                    { time: '0915', price: 34.98 },
                    { time: '1045', price: 33.13 },
                    { time: '1230', price: 32.01 },
                    { time: '1400', price: 31.98 },
                    { time: '1530', price: 30.56 },
                ],
            };
            const output = mapper.mapEachRecord(input);
            expect(output.profit).toEqual(undefined);
        });
    });
});
