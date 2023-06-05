import axios from 'axios';
import { Employee } from '@/appTypes/employee';

export const getEmployees = () =>
	axios.get('/api/employees').then(({ data }) => data);

export const getEmployee = (id: number) =>
	axios.get(`/api/employees/${id}`).then((res) => res.data);

export const postEmployee = (employee: Employee) =>
	axios.post('/api/employees', employee).then((res) => res.data);

export const putEmployee = (id: number, employee: Employee) =>
	axios.put(`/api/employees/${id}`, employee).then((res) => res.data);

export const deleteEmployee = (id: number) =>
	axios.delete(`/api/employees/${id}`).then((res) => res.data);
