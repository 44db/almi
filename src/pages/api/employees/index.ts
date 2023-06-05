import type { NextApiRequest, NextApiResponse } from 'next';
import { Employee } from '@/appTypes/employee';
import { getEmployees, postEmployee } from '@/services/employee.service';

type Data = Employee[] | Employee | Error;

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
		const employees = await getEmployees();
		res.status(200).json(employees);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}

async function postHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const employee = await postEmployee(req.body);
		if (!employee) return res.status(400).end('Bad Request');
		res.status(200).json(employee);
	} catch (error: any) {
		console.error(error);
		res.status(500).json(error);
	}
}
