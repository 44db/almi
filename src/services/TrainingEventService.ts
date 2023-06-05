import prisma from '@/libs/prisma';
import type {
	Prisma,
	TrainingEvent,
	TrainingEventsOnEmployees,
	TrainingEventsOnTrainings,
} from '@prisma/client';

// export async function createTrainingEvent(body) {
// 	return prisma.trainingEvent.create({
// 		...body
// 	})
// }

export async function getTrainingEvent({
	id,
}: {
	id: number;
}): Promise<TrainingEvent | null> {
	return prisma.trainingEvent.findUnique({
		where: {
			id: id,
		},
		include: {
			employees: {
				include: {
					employee: true,
				},
			},
			trainings: {
				include: {
					training: true,
				},
			},
			facilitator: true,
		},
	});
}

export async function getAllTrainingEvents(): Promise<TrainingEvent[]> {
	return prisma.trainingEvent.findMany({
		include: {
			employees: {
				include: {
					employee: true,
				},
			},
			trainings: {
				include: {
					training: true,
				},
			},
			facilitator: true,
		},
	});
}

export async function addTrainingEvent(body: any): Promise<TrainingEvent> {
	const employees = body.employees.map((emp: TrainingEventsOnEmployees) => {
		return {
			employee: {
				connect: {
					id: emp.employeeId,
				},
			},
			position: emp.position,
			attendanceType: emp.attendanceType,
		};
	});

	const trainings = body.trainings.map((train: TrainingEventsOnTrainings) => {
		return {
			training: {
				connect: {
					id: train.trainingId,
				},
			},
		};
	});

	return prisma.trainingEvent.create({
		data: {
			date: body.date,
			employees: { create: employees },
			trainings: { create: trainings },
			facilitator: {
				connect: {
					id: body.facilitatorId,
				},
			},
		},
	});
}

export async function updateTrainingEvent(
	id: number,
	body: any
): Promise<TrainingEvent> {
	const employees = body.employees.map((emp: TrainingEventsOnEmployees) => {
		return {
			employee: {
				connect: {
					id: emp.employeeId,
				},
			},
			position: emp.position,
			attendanceType: emp.attendanceType,
		};
	});

	const trainings = body.trainings.map((train: TrainingEventsOnTrainings) => {
		return {
			training: {
				connect: {
					id: train.trainingId,
				},
			},
		};
	});

	return prisma.trainingEvent.update({
		where: {
			id: id,
		},
		data: {
			date: body.date,
			employees: { upsert: employees },
			trainings: { upsert: trainings },
			facilitator: {
				connect: {
					id: body.facilitatorId,
				},
			},
		},
	});
}
