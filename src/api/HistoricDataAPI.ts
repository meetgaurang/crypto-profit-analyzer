import axios from 'axios';
import { HistoricRecord } from './HistoricDataAPI.types';

export const HistoricDataAPI = {
    // Actual API call as and when API is ready
    async getHistoricData(): Promise<HistoricRecord[]> {
        const response: HistoricRecord[] = await axios.get('http://localhost:4000/records');
        return response;
    }
};
