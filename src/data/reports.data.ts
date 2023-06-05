import { PrismaClient } from '@prisma/client';
import { ReportAttributes, TrainingEventWithEmployees, TrainingEventWithFacilitator } from '@/appTypes/report';

const prisma = new PrismaClient();


// Number of Training Events by Employee for a specified period
export async function getTrainingCountByEmployee({ startDate, endDate  }:ReportAttributes): Promise<TrainingEventWithEmployees[]> {

	const trainings: TrainingEventWithEmployees[] = await prisma.trainingEvent.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate,
			},
		},
		include: {
			employees: {
				include: {
					employee: true
				}
			}
		},		
	});

	return trainings

}


// Number of Training Events by Position for a specified period
export async function getTrainingCountByPosition({ startDate, endDate  }:ReportAttributes): Promise<TrainingEventWithEmployees[]> {

	const trainings: TrainingEventWithEmployees[] = await prisma.trainingEvent.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate
			},
		},
		include: {
			employees: true,			
		},
	});

	return trainings;
	
}

// Number of Training Events by Facilitator for a specified period
export async function getTrainingCountByFacilitator({ startDate, endDate  }:ReportAttributes): Promise<TrainingEventWithFacilitator[]> {
	
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

	return trainings;
}