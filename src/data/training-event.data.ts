import prisma from '@/libs/prisma';
import type { Prisma, TrainingEvent } from '@prisma/client';

const include: Prisma.TrainingEventInclude = {
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
};

export async function getAllTrainingEvents(): Promise<TrainingEvent[]> {
	return prisma.trainingEvent.findMany({ include });
}

export const getTrainingEvent = ({ id }: { id: number }) =>
	prisma.trainingEvent.findUnique({
		where: {
			id: id,
		},
		include,
	});

export async function postTrainingEvent(body: any): Promise<TrainingEvent> {
	console.log(body);

	const employees = body.employees.map((emp: any) => {
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

	const trainings = body.trainings.map((train: any) => {
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
			name: body.name,
			date: body.date,
			employees: { create: employees },
			trainings: { create: trainings },
			facilitator: {
				connect: {
					id: body.facilitatorId,
				},
			},
		},
		include,
	});
}

export async function putTrainingEvent({
	id,
	body,
}: {
	id: number;
	body: any;
}): Promise<TrainingEvent> {
	return await prisma.trainingEvent.update({
		where: {
			id: id,
		},
		data: {
			date: body.date,
			name: body.name,
			employees: {
				deleteMany: {},
				create: body.employees.map((emp: any) => {
					return {
						employee: {
							connect: {
								id: emp.employeeId,
							},
						},
						attendanceType: emp.attendanceType,
						position: emp.position,
					};
				}),
			},
			trainings: {
				deleteMany: {},
				create: body.trainings.map((train: any) => {
					return {
						training: {
							connect: {
								id: train.trainingId,
							},
						},
					};
				}),
			},
			facilitator: {
				connect: {
					id: body.facilitatorId,
				},
			},
		},
		include,
	});
}

export async function deleteTrainingEvent({ id }: { id: number }) {
	await prisma.trainingEvent.update({
		where: {
			id: id,
		},
		data: {
			employees: {
				deleteMany: {},
			},
			trainings: {
				deleteMany: {},
			},
		},
	});

	return await prisma.trainingEvent.delete({
		where: {
			id: id,
		},
	});
}
