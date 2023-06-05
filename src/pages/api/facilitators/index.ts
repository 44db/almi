import type { NextApiRequest, NextApiResponse } from 'next';
import { Facilitator } from '@/appTypes/facilitator';
import { getFacilitators, postFacilitator } from '@/services/facilitator.service';

type Data = Facilitator[] | Facilitator | Error;

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
		const facilitators = await getFacilitators();
		res.status(200).json(facilitators);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const facilitator = await postFacilitator(req.body);
		if (!facilitator) return res.status(400).end('Bad Request');
		res.status(200).json(facilitator);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
