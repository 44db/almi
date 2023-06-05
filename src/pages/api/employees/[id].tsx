import type { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '@/appTypes/employee';

import {
	getEmployee,
	updateEmployee,
	deleteEmployee,
} from '@/services/employee.service';

type Data = Employee | Error;

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
		const employee = await getEmployee({ id: Number(req.query.id) });
		if (!employee)
			return res.status(404).json(new Error('Employee not found'));
		res.status(200).json(employee as Employee);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function putHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const employee = await updateEmployee({
			id: Number(req.query.id),
			body: req.body,
		});
		if (!employee)
			return res.status(404).json(new Error('employee not found'));
		res.status(200).json(employee);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		await deleteEmployee({ id: Number(req.query.id) });
		res.status(200).json({} as Employee);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
