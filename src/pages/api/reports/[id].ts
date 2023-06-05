import type { NextApiRequest, NextApiResponse } from 'next';
import { getReportTrainingCountByEmployee, getReportTrainingCountByPosition, getReportTrainingCountByFacilitator } from '@/services/report.service';

type Data = Record<string,number> | Error | void;

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

		let report

		switch(req.query.id) {
			case 'training-count-by-employee':
				report = await getReportTrainingCountByEmployee({ startDate: start, endDate: end });
				break;
			case 'training-count-by-position':
				report = await getReportTrainingCountByPosition({ startDate: start, endDate: end });
				break;
			case 'training-count-by-facilitator':
				report = await getReportTrainingCountByFacilitator({ startDate: start, endDate: end });
				break;
			default:
				res.status(404).end(`Not Found`);
				return;
		}

		res.status(200).json(report);

	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}