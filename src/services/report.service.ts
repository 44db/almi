import {
	getTrainingCountByEmployee,
	getTrainingCountByPosition,
	getTrainingCountByFacilitator
} from '@/data/reports.data';

import { Employee } from '@/appTypes/employee';

interface ReportEmployee extends Employee {
	count: number
}


import { ReportAttributes, TrainingEventWithEmployees, TrainingEventWithFacilitator } from '@/appTypes/report';


export async function getReportTrainingCountByEmployee({ startDate, endDate }: ReportAttributes):Promise<Record<string, ReportEmployee>> {

	// Call the repository method
	const trainingCountByEmployee = await getTrainingCountByEmployee({ startDate, endDate });
	
	// Tranform the data before returning it
	const report: Record<string, ReportEmployee> = trainingCountByEmployee.reduce((acc: Record<string, ReportEmployee>, curr: TrainingEventWithEmployees) => {
		curr.employees.forEach((relation:any) => {
			if (acc[relation.employeeId]) {
				acc[relation.employeeId] = {
					id: relation.employeeId,
					name: relation.employee.name,
					surname: relation.employee.surname,
					position: relation.position,
					attendanceType: relation.attendanceType,
					count: acc[relation.employeeId].count + 1
				}			
			} else {
				acc[relation.employeeId] = {
					id: relation.employeeId,
					name: relation.employee.name,
					surname: relation.employee.surname,
					position: relation.position,
					attendanceType: relation.attendanceType,					
					count: 1
				}
			}
		});
		return acc;
	}, {});

	console.log(report)

	return report;

}

export async function getReportTrainingCountByPosition({ startDate, endDate }: ReportAttributes):Promise<Record<string, number>> {

	const trainingCountByPosition = await getTrainingCountByPosition({ startDate, endDate });

	const report: Record<string, number> = trainingCountByPosition.reduce((acc: Record<string, number>, curr: TrainingEventWithEmployees) => {
		curr.employees.forEach((relation) => {
			const position = relation.position;
			if (acc[position]) {
				acc[position]++;
			} else {
				acc[position] = 1;
			}
		});
		return acc;
	}, {});

	return report;

}

export async function getReportTrainingCountByFacilitator({ startDate, endDate }: ReportAttributes) {

	const trainingCountByFacilitator = await getTrainingCountByFacilitator({ startDate, endDate });

	const report: Record<string, number> = trainingCountByFacilitator.reduce((acc: Record<string, number>, curr: TrainingEventWithFacilitator) => {
		const facilitatorName = curr.facilitator.name;
		if (acc[facilitatorName]) {
			acc[facilitatorName]++;
		} else {
			acc[facilitatorName] = 1;
		}
		return acc;
	}, {});

	return report;

}




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