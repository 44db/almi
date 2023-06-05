import type { NextApiRequest, NextApiResponse } from 'next';
import { getReports } from '@/services/report.service';

type Data = Record<string, number> | Error;

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

		// Grab url parameters startDate and endDate
		const { startDate, endDate } = req.query;
		// if parameters do not exist use default values
		const start = startDate ? new Date(startDate as string) : new Date('2023-01-01');
		const end = endDate ? new Date(endDate as string) : new Date('2023-12-31');

		const reports = await getReports({ startDate: start, endDate: end });		
		res.status(200).json(reports);

	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}