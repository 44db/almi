import {
	getAllTrainingEvents as getAllTrainingEventsData,
	getTrainingEvent as getTrainingEventData,
	putTrainingEvent as updateTrainingEventData,
	postTrainingEvent as addTrainingEventData,
	deleteTrainingEvent as deleteTrainingEventData,
} from '@/data/training-event.data';

// import { TrainingEvent } from '@/types/training-event';
// import { Employee } from '@/types/employee';

export async function getAllTrainingEvents() {
	// Perform any necessary business logic or validation

	// Call the repository method
	const trainingEvents = await getAllTrainingEventsData();

	// Tranform the data before returning it
	const transformedData = trainingEvents.map((trainingEvent) => {
		return transformTrainingEvent(trainingEvent);
	});

	return transformedData;
}

export async function getTrainingEvent({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const trainingEvent = await getTrainingEventData({ id });

	if (!trainingEvent) return null;

	// Tranform the data before returning it
	const transformedData = transformTrainingEvent(trainingEvent);

	return transformedData;
}

export async function updateTrainingEvent({
	id,
	body,
}: {
	id: number;
	body: any;
}) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const trainingEvent = await updateTrainingEventData({ id, body });

	if (!trainingEvent) return null;

	// Tranform the data before returning it
	const transformedData = transformTrainingEvent(trainingEvent);

	return transformedData;
}

export async function addTrainingEvent({ body }: { body: any }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const trainingEvent = await addTrainingEventData(body);

	if (!trainingEvent) return null;

	// Tranform the data before returning it
	const transformedData = transformTrainingEvent(trainingEvent);

	return transformedData;
}

export async function deleteTrainingEvent({ id }: { id: number }) {
	await deleteTrainingEventData({ id });
}

const transformTrainingEvent = (trainingEvent: any) => ({
	id: trainingEvent.id,
	employees: trainingEvent.employees.map((employee: any) => ({
		id: employee.employeeId,
		name: employee.employee.name,
		surname: employee.employee.surname,
		position: employee.position,
		attendanceType: employee.attendanceType,
	})),
	trainings: trainingEvent.trainings.map((training: any) => ({
		id: training.training.id,
		name: training.training.name,
	})),
	facilitator: trainingEvent.facilitator,
	name: trainingEvent.name,
	date: trainingEvent.date,
});
