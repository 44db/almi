import type { NextApiRequest, NextApiResponse } from 'next';
import { Training } from '@/appTypes/training';
import {
	getTraining,
	updateTraining,
	deleteTraining,
} from '@/services/training.service';

type Data = Training | Error;

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
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const training = await getTraining({ id: Number(req.query.id) });
		if (!training)
			return res.status(404).json(new Error('Training event not found'));
		res.status(200).json(training);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function putHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const training = await updateTraining({
			id: Number(req.query.id),
			body: req.body,
		});
		if (!training)
			return res.status(404).json(new Error('Training not found'));
		res.status(200).json(training);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		await deleteTraining({ id: Number(req.query.id) });
		// const trainingEvent = await getTrainingEvent({ id: Number(req.query.id) });
		// if (!trainingEvent) return res.status(404).json(new Error('Training event not found'));
		res.status(200).json({} as Training);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
