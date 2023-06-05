import prisma from '@/libs/prisma';
import type { Facilitator } from '@prisma/client';

export const getFacilitators = () => prisma.facilitator.findMany();

export const getFacilitator = ({ id }: { id: number }) =>
	prisma.facilitator.findUnique({
		where: {
			id: id,
		},
	});

export const postFacilitator = (facilitator: Facilitator) =>
	prisma.facilitator.create({
		data: facilitator,
	});

export const updateFacilitator = ({
	id,
	body,
}: {
	id: number;
	body: Facilitator;
}) =>
	prisma.facilitator.update({
		where: {
			id: id,
		},
		data: body,
	});

// For the delete action we should check if the facilitator has any training events associated with it
// and either throw an error or delete the facilitator from the events

export const deleteFacilitator = ({ id }: { id: number }) =>
	prisma.facilitator.delete({
		where: {
			id: id,
		},
	});
