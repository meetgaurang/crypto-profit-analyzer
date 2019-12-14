import axios from 'axios';
import { IHistoricDataAPIResponse } from './HistoricDataAPI.types';
import mockedResponse from './mockedResponse.json';

export const HistoricDataAPI = {

    // Actual API call as and when API is ready
    async getHistoricData(): Promise<IHistoricDataAPIResponse> {
        const response: IHistoricDataAPIResponse = 
            await axios.get('http://localhost:3000/historicdata');
        return response;
    },

    /*  Mocked API call to be used in an absence of a server. 
     *  Ideally 'Drydock' mocking server should be used for a large scale development 
     */
    async getMockedHistoricData(): Promise<IHistoricDataAPIResponse> {
        const promise: Promise<IHistoricDataAPIResponse> = new Promise(function (resolve, reject) {
            window.setTimeout(() => {
                resolve(<any>mockedResponse);
            }, 500);
        });
        return promise;
    }
}