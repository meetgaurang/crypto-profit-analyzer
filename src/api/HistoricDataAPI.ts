import axios from 'axios';
import { HistoricDataAPIResponse } from './HistoricDataAPI.types';
import mockedResponse from './mockedResponse.json';

export const HistoricDataAPI = {
    // Actual API call as and when API is ready
    async getHistoricData(): Promise<HistoricDataAPIResponse> {
        const response: HistoricDataAPIResponse = await axios.get('http://localhost:3000/historicdata');
        return response;
    },

    /*  Mocked API call to be used in an absence of a server.
     *  Ideally 'Drydock' mocking server should be used for a large scale development
     */
    async getMockedHistoricData(): Promise<HistoricDataAPIResponse> {
        const promise: Promise<HistoricDataAPIResponse> = new Promise(function (resolve, reject) {
            window.setTimeout(() => {
                resolve(mockedResponse as any);
            }, 500);
        });
        return promise;
    },
};
