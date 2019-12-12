import { HistoricDataAPI } from '../../api/HistoricDataAPI';
import { IHistoricDataAPIResponse, IQuote, IHistoricRecord } from '../../api/HistoricDataAPI.types';
import { IDateWiseRecord, IProfitRecord } from './Analytics.types';
import * as _ from "lodash";

export class AnalyticsMapper {

    /*mapResponse(): IHistoricDataList {
        const response: IHistoricDataAPIResponse = [
            {
                currency: "BTC",
                date: "20180507",
                quotes: [
                    {time: "0915", price: 34.98},
                    {time: "1045", price: 36.13},
                    {time: "1230", price: 37.01},
                    {time: "1400", price: 35.98},
                    {time: "1530", price: 33.56}
                ]
            },
            {
                currency: "ETC",
                date: "20180507",
                quotes: [
                    {time: "0900", price: 1.45},
                    {time: "1030", price: 1.87},
                    {time: "1245", price: 1.55},
                    {time: "1515", price: 2.01},
                    {time: "1700", price: 2.15}
                ]
            },
            {
                currency: "LTC",
                date: "20180507",
                quotes: [
                    {time: "0930", price: 14.32},
                    {time: "1115", price: 14.87},
                    {time: "1245", price: 15.03},
                    {time: "1400", price: 14.76},
                    {time: "1700", price: 14.15}
                ]
            }
        ];
        
        let output: IDateWiseRecord[] = [];
        response.map((eachRecord: IHistoricRecord) => {
            let matchingDate: IDateWiseRecord = _.find(output, {date: eachRecord.date});
            if (!!matchingDate) {
                
            }
        });
    }*/

    mapEachRecord(input: IHistoricRecord): IProfitRecord {
        let potentialBuyAmount;
        let potentialBuyTime;
        let maxProfit;
        let output: IProfitRecord = {};
        output.currency = input.currency;

        output.buyPrice = input.quotes[0].price;
        output.buyTime = input.quotes[0].time;
        for (let i = 1; i < input.quotes.length; i++) {
            // Check if buyPrice should be changed
            if (input.quotes[i].price <= output.buyPrice) {
                if (!!maxProfit) {
                    potentialBuyAmount = input.quotes[i].price;
                    potentialBuyTime = input.quotes[i].time;
                } else {
                    output.buyPrice = input.quotes[i].price;
                    output.buyTime = input.quotes[i].time;
                }
            } else {
                if (!!maxProfit) {
                    if (!!potentialBuyAmount) {
                        // If max profit can be achieved with potentialBuyAmount, redefine buy and sell price
                        if (input.quotes[i].price - potentialBuyAmount > maxProfit) {
                            output.buyPrice = potentialBuyAmount;
                            output.buyTime = potentialBuyTime;
                            output.sellPrice = input.quotes[i].price;
                            output.sellTime = input.quotes[i].time;
                            maxProfit = output.sellPrice - output.buyPrice;
                            potentialBuyTime = undefined;
                            potentialBuyAmount = undefined;
                        }    
                    } else {
                        // In an absence of potentialBuyAmountpotentialBuyAmount, see if you need to redefine sellPrice
                        if (input.quotes[i].price - output.buyPrice > maxProfit) {
                            output.sellPrice = input.quotes[i].price;
                            output.sellTime = input.quotes[i].time;
                            maxProfit = output.sellPrice - output.buyPrice;    
                        }
                    }
                } else {
                    // In an absence of maxProfit, just redefine sell price
                    output.sellPrice = input.quotes[i].price;
                    output.sellTime = input.quotes[i].time;
                    maxProfit = output.sellPrice - output.buyPrice;
                }
            }
        }
        if (_.isEmpty(maxProfit)) {
            output.buyPrice = undefined;
            output.buyTime = undefined;
        } else {
            output.profit = maxProfit;
        }
        return output;
    }
}
