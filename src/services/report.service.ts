import {
	getTrainingCountByEmployee,
	getTrainingCountByPosition,
	getTrainingCountByFacilitator
} from '@/data/reports.data';

import { ReportAttributes } from '@/appTypes/report';

export async function getReports({ startDate, endDate }: ReportAttributes) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const trainingCountByEmployee = await getTrainingCountByEmployee({ startDate, endDate });
	const trainingCountByPosition = await getTrainingCountByPosition({ startDate, endDate });
	const trainingCountByFacilitator = await getTrainingCountByFacilitator({ startDate, endDate });

	// Transform the data before returning it
	const transformedData = {
		trainingCountByEmployee,		
		trainingCountByPosition,
		trainingCountByFacilitator,
	};

	return transformedData;
}