import type { NextApiRequest, NextApiResponse } from 'next';
import { Facilitator } from '@/appTypes/facilitator';

import {
	getFacilitator,
	updateFacilitator,
	deleteFacilitator,
} from '@/services/facilitator.service';

type Data = Facilitator | Error;

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
		const facilitator = await getFacilitator({ id: Number(req.query.id) });
		if (!facilitator)
			return res.status(404).json(new Error('facilitator not found'));
		res.status(200).json(facilitator as Facilitator);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function putHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const facilitator = await updateFacilitator({
			id: Number(req.query.id),
			body: req.body,
		});
		if (!facilitator)
			return res.status(404).json(new Error('facilitator not found'));
		res.status(200).json(facilitator);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		await deleteFacilitator({ id: Number(req.query.id) });
		res.status(200).json({} as Facilitator);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
