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
        let potentialBuy: IQuote = {};
        let maxProfit;
        let output: IProfitRecord = {
            buyDetails: {},
            sellDetails: {}
        };
        output.currency = input.currency;

        this.assignQuote(output.buyDetails, input.quotes[0]);
        for (let i = 1; i < input.quotes.length; i++) {
            // If next price is less than potentialBuyPrice
            if (!!potentialBuy.price && input.quotes[i].price <= potentialBuy.price) {
                this.assignQuote(potentialBuy, input.quotes[i]);
            }
            // If next price is less than buyPrice
            else if (!potentialBuy.price && input.quotes[i].price <= output.buyDetails.price) {
                if (!!maxProfit) {
                    this.assignQuote(potentialBuy, input.quotes[i]);
                } else {
                    this.assignQuote(output.buyDetails, input.quotes[i]);
                }
            }
            // If next price is greater than buyprice
            else {
                if (!!maxProfit) {
                    if (!!potentialBuy.price) {
                        // If max profit can be achieved with potentialBuy.price, redefine buy and sell price
                        if (input.quotes[i].price - potentialBuy.price > maxProfit) {
                            this.assignQuote(output.buyDetails, potentialBuy);
                            this.assignQuote(output.sellDetails, input.quotes[i]);
                            maxProfit = output.sellDetails.price - output.buyDetails.price;
                            this.assignQuote(potentialBuy, undefined);
                        }    
                    } else {
                        // In an absence of potentialBuy.price, see if you need to redefine sellPrice
                        if (input.quotes[i].price - output.buyDetails.price > maxProfit) {
                            this.assignQuote(output.sellDetails, input.quotes[i]);
                            maxProfit = output.sellDetails.price - output.buyDetails.price;
                        }
                    }
                } else {
                    // In an absence of maxProfit, just redefine sell price
                    this.assignQuote(output.sellDetails, input.quotes[i]);
                    maxProfit = output.sellDetails.price - output.buyDetails.price;
                }
            }
        }
        // If prices were in descending order for the given day then not possible to book profit
        if (_.isUndefined(maxProfit)) {
            this.assignQuote(output.buyDetails, undefined);
        } else {
            output.profit = Math.round(maxProfit * 100) / 100;
        }
        return output;
    }

    assignQuote(fromQuote: IQuote, toQuote: IQuote) {
        if (toQuote == undefined) {
            fromQuote.price = undefined;
            fromQuote.time = undefined;
        } else {
            fromQuote.price = toQuote.price;
            fromQuote.time = toQuote.time;
        }
    }
}
