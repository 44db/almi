import type { NextApiRequest, NextApiResponse } from 'next';

import { TrainingEvent } from '@/appTypes/training-event';
import {
	getAllTrainingEvents,
	addTrainingEvent,
} from '@/services/training-event.service';

type Data = TrainingEvent[] | TrainingEvent | Error;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getHandler(req, res);
		case 'POST':
			return postHandler(req, res);
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
			return;
	}
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const trainingEvents = await getAllTrainingEvents();
		res.status(200).json(trainingEvents);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const trainingEvent = await addTrainingEvent({ body: req.body });
		if (!trainingEvent) return res.status(400).end('Bad Request');
		res.status(200).json(trainingEvent);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
