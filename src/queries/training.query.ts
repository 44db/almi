import axios from 'axios';
import { Training } from '@/appTypes/training';

export const getTrainings = () =>
	axios.get('/api/trainings').then((res) => res.data);

export const getTraining = (id: number) =>
	axios.get(`/api/trainings/${id}`).then((res) => res.data);

export const postTraining = (training: Training) =>
	axios.post('/api/trainings', training).then((res) => res.data);

export const putTraining = (id: number, training: Training) =>
	axios.put(`/api/trainings/${id}`, training).then((res) => res.data);

export const deleteTraining = (id: number) =>
	axios.delete(`/api/trainings/${id}`).then((res) => res.data);
