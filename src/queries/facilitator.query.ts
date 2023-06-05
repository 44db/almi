import axios from 'axios';
import { Facilitator } from '@/appTypes/facilitator';

export const getFacilitators = () =>
	axios.get('/api/facilitators').then(({ data }) => data);

export const getFacilitator = (id: number) =>
	axios.get(`/api/facilitators/${id}`).then((res) => res.data);

export const postFacilitator = (facilitator: Facilitator) =>
	axios.post('/api/facilitators', facilitator).then((res) => res.data);

export const putFacilitator = (id: number, facilitator: Facilitator) =>
	axios.put(`/api/facilitators/${id}`, facilitator).then((res) => res.data);

export const deleteFacilitator = (id: number) =>
	axios.delete(`/api/facilitators/${id}`).then((res) => res.data);
