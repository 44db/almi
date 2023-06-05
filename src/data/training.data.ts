import prisma from '@/libs/prisma';
import type { Training } from '@prisma/client';

export const getTrainings = () => prisma.training.findMany();

export const getTraining = ({ id }: { id: number }) =>
	prisma.training.findUnique({
		where: {
			id: id,
		},
	});

export const postTraining = (training: Training) =>
	prisma.training.create({
		data: training,
	});

export const updateTraining = ({ id, body }: { id: number; body: Training }) =>
	prisma.training.update({
		where: {
			id: id,
		},
		data: body,
	});

// For the delete action we should check if the training has any training events associated with it
// and either throw an error or delete the trainings from the events

export const deleteTraining = ({ id }: { id: number }) =>
	prisma.training.delete({
		where: {
			id: id,
		},
	});
