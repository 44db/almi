import type { NextApiRequest, NextApiResponse } from 'next';
import { Training } from '@prisma/client';

import { getTrainings, postTraining } from '@/services/training.service';

type Data = Training[] | Training | Error;

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
		const trainings = await getTrainings();
		res.status(200).json(trainings);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const training = await postTraining(req.body);
		if (!training) return res.status(400).end('Bad Request');
		res.status(200).json(training);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
