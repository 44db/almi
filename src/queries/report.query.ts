import axios from 'axios';
import qs from 'qs';

import { ReportAttributes } from '@/appTypes/report';

// export const getReports = ({ startDate, endDate }:ReportAttributes) => {

// 	// Create query string with startdate and endate
// 	const query = qs.stringify({ startDate, endDate });
// 	return axios.get(`/api/reports?${query}`).then((res) => res.data);
// }
	
export const getReportTrainingCountByEmployee = ({ startDate, endDate }:ReportAttributes) => {
	const query = qs.stringify({ startDate, endDate });
	return axios.get(`/api/reports/training-count-by-employee?${query}`).then((res) => res.data);
}

export const getReportTrainingCountByPosition = ({ startDate, endDate }:ReportAttributes) => {
	const query = qs.stringify({ startDate, endDate });
	return axios.get(`/api/reports/training-count-by-position?${query}`).then((res) => res.data);
}

export const getReportTrainingCountByFacilitator = ({ startDate, endDate }:ReportAttributes) => {
	const query = qs.stringify({ startDate, endDate });
	return axios.get(`/api/reports/training-count-by-facilitator?${query}`).then((res) => res.data);
}