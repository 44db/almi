import type { NextApiRequest, NextApiResponse } from 'next';
import { Facilitator } from '@prisma/client';

import { getAllFacilitators } from '@/services/facilitator.service';

type Data = Facilitator[] | Error;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getHandler(req, res);
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
			return;
	}
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const facilitators = await getAllFacilitators();
		res.status(200).json(facilitators);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
