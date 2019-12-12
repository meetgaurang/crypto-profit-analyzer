import { AnalyticsMapper } from './Analytics.mapper';
import { IHistoricRecord } from '../../api/HistoricDataAPI.types';

describe('AnalyticsMapper', () => {
    let mapper: AnalyticsMapper;
    beforeAll(() => {
        mapper = new AnalyticsMapper();
    });
    it('mapEachRecord', () => {
        const input: IHistoricRecord = {
            currency: "BTC",
            date: "20180507",
            quotes: [
                {time: "0915", price: 34.98},
                {time: "1045", price: 36.13},
                {time: "1230", price: 37.01},
                {time: "1400", price: 35.98},
                {time: "1530", price: 33.56}
            ]
        };
        let output = mapper.mapEachRecord(input);
        expect(output).toEqual({
            currency: "BTC",
            buyPrice: 34.98,
            buyTime: "0915",
            sellPrice: 37.01,
            sellTime: "1230",
            profit: 2.03
        });
    });
});