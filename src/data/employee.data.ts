import prisma from '@/libs/prisma';
import type { Employee } from '@prisma/client';

export const getEmployees = () => prisma.employee.findMany();

export const getEmployee = ({ id }: { id: number }) =>
	prisma.employee.findUnique({
		where: {
			id: id,
		},
	});

export const postEmployee = (employee: Employee) =>
	prisma.employee.create({
		data: employee,
	});

export const updateEmployee = ({ id, body }: { id: number; body: Employee }) =>
	prisma.employee.update({
		where: {
			id: id,
		},
		data: body,
	});

// For the delete action we should check if the employee has any training events associated with it
// and either throw an error or delete the employee from the events

export const deleteEmployee = ({ id }: { id: number }) =>
	prisma.employee.delete({
		where: {
			id: id,
		},
	});
