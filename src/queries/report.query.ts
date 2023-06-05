import axios from 'axios';
import qs from 'qs';

import { ReportAttributes } from '@/appTypes/report';

export const getReports = ({ startDate, endDate }:ReportAttributes) => {

	// Create query string with startdate and endate
	const query = qs.stringify({ startDate, endDate });
	return axios.get(`/api/reports?${query}`).then((res) => res.data);
}
	
