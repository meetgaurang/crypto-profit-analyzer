import { Quote, HistoricRecord } from '../../api/HistoricDataAPI.types';
import { DateWiseRecord, ProfitRecord } from './Analytics.types';
import * as _ from 'lodash';

export class AnalyticsMapper {
    mapResponse(records: HistoricRecord[]): DateWiseRecord[] {
        const output: DateWiseRecord[] = [];
        records.forEach((eachRecord: HistoricRecord) => {
            const profitRecord: ProfitRecord = this.mapEachRecord(eachRecord);
            const matchingDateRecord: DateWiseRecord = _.find(output, { date: eachRecord.date });
            if (!!matchingDateRecord) {
                matchingDateRecord.profitList.push(profitRecord);
            } else {
                output.push({
                    date: eachRecord.date,
                    profitList: [profitRecord],
                });
            }
        });
        return output;
    }

    mapEachRecord(input: HistoricRecord): ProfitRecord {
        const potentialBuy: Quote = {};
        let maxProfit;
        const output: ProfitRecord = {
            buyDetails: {},
            sellDetails: {},
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
        output.profit = _.isUndefined(maxProfit) ? undefined : Math.round(maxProfit * 100) / 100;

        return output;
    }

    assignQuote(fromQuote: Quote, toQuote: Quote) {
        if (toQuote === undefined) {
            fromQuote.price = undefined;
            fromQuote.time = undefined;
        } else {
            fromQuote.price = toQuote.price;
            fromQuote.time = toQuote.time;
        }
    }
}
