import axios from 'axios';
import { TrainingEventProps } from '@/appTypes/training-event';

export const getTrainingEvents = () =>
	axios.get('/api/training-events').then(({ data }) => data);

export const getTrainingEvent = (id: number) =>
	axios.get(`/api/training-events/${id}`).then(({ data }) => data);

export const postTrainingEvent = (body: TrainingEventProps) =>
	axios.post('/api/training-events', body).then(({ data }) => data);

export const putTrainingEvent = (id: number, body: TrainingEventProps) =>
	axios.put(`/api/training-events/${id}`, body).then(({ data }) => data);

export const deleteTrainingEvent = (id: number) =>
	axios.delete(`/api/training-events/${id}`).then(({ data }) => data);
