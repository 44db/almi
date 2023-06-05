import { PrismaClient, TrainingEvent, Facilitator, TrainingEventsOnEmployees } from '@prisma/client';
import { ReportAttributes } from '@/appTypes/report';

const prisma = new PrismaClient();

type TrainingEventWithEmployees = TrainingEvent & {
	employees: TrainingEventsOnEmployees[]
};

type TrainingEventWithFacilitator = TrainingEvent & {
	facilitator: Facilitator
};



// Number of Training Events by Employee for a specified period
export async function getTrainingCountByEmployee({ startDate, endDate  }:ReportAttributes): Promise<Record<string, number>> {

	const trainings: TrainingEventWithEmployees[] = await prisma.trainingEvent.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate,
			},
		},
		include: {
			employees: true,
		},
	});

	const report: Record<string, number> = trainings.reduce((acc: Record<string, number>, curr: TrainingEventWithEmployees) => {
		curr.employees.forEach((relation) => {
			if (acc[relation.employeeId]) {
				acc[relation.employeeId]++;
			} else {
				acc[relation.employeeId] = 1;
			}
		});
		return acc;
	}, {});

	return report;

}


// Number of Training Events by Position for a specified period
export async function getTrainingCountByPosition({ startDate, endDate  }:ReportAttributes): Promise<Record<string, number>> {

	const trainings: TrainingEventWithEmployees[] = await prisma.trainingEvent.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate
			},
		},
		include: {
			employees: true
		},
	});

	const report: Record<string, number> = trainings.reduce((acc: Record<string, number>, curr: TrainingEventWithEmployees) => {
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

// Number of Training Events by Facilitator for a specified period
export async function getTrainingCountByFacilitator({ startDate, endDate  }:ReportAttributes): Promise<Record<string, number>> {
	
	const trainings: TrainingEventWithFacilitator[] = await prisma.trainingEvent.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate
			},
		},
		include: {
			facilitator: true
		},
	});

	const report: Record<string, number> = trainings.reduce((acc: Record<string, number>, curr: TrainingEventWithFacilitator) => {
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