import type { NextApiRequest, NextApiResponse } from 'next';
// import { TrainingEvent } from '@prisma/client';
import { TrainingEvent } from '@/appTypes/training-event';
// import { getAllTrainingEvents, addTrainingEvent } from '@/services/TrainingEventService';
// import { getTrainingEvent, updateTrainingEvent } from '@/services/TrainingEventService';
import {
	getTrainingEvent,
	updateTrainingEvent,
	deleteTrainingEvent,
} from '@/services/training-event.service';

type Data = TrainingEvent | Error;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getHandler(req, res);
		case 'PUT':
			return putHandler(req, res);
		case 'DELETE':
			return deleteHandler(req, res);
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
			return;
	}

	// try {
	// 	const facilitators = await getAllFacilitators();
	// 	res.status(200).json({ facilitators });
	// } catch (error:any) {
	// 	console.error(error);
	// 	res.status(500).json({ error: error.message });
	// }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const trainingEvent = await getTrainingEvent({
			id: Number(req.query.id),
		});
		if (!trainingEvent)
			return res.status(404).json(new Error('Training event not found'));

		res.status(200).json(trainingEvent);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function putHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const trainingEvent = await updateTrainingEvent({
			id: Number(req.query.id),
			body: req.body,
		});
		if (!trainingEvent)
			return res.status(404).json(new Error('Training event not found'));
		res.status(200).json(trainingEvent);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		await deleteTrainingEvent({ id: Number(req.query.id) });
		// const trainingEvent = await getTrainingEvent({ id: Number(req.query.id) });
		// if (!trainingEvent) return res.status(404).json(new Error('Training event not found'));
		res.status(200).json({} as TrainingEvent);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
