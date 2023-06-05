import {
	getTrainings as getAllTrainingsData,
	getTraining as getTrainingData,
	postTraining as postTrainingData,
	updateTraining as updateTrainingData,
	deleteTraining as deleteTrainingData,
} from '@/data/training.data';

export async function getTrainings() {
	// Perform any necessary business logic or validation

	// Call the repository method
	const trainings = await getAllTrainingsData();

	// Transform the data before returning it
	const transformedData = trainings.map((training) => {
		return training;
	});

	return transformedData;
}

export async function getTraining({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const training = await getTrainingData({ id });

	// Transform the data before returning it
	const transformedData = {
		...training,
	};

	return transformedData;
}

export async function postTraining(training: any) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const newTraining = await postTrainingData(training);

	// Transform the data before returning it
	const transformedData = {
		...newTraining,
	};

	return transformedData;
}

export async function updateTraining({ id, body }: { id: number; body: any }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const updatedTraining = await updateTrainingData({ id, body });

	// Transform the data before returning it
	const transformedData = {
		...updatedTraining,
	};

	return transformedData;
}

export async function deleteTraining({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const deletedTraining = await deleteTrainingData({ id });

	// Transform the data before returning it
	const transformedData = {
		...deletedTraining,
	};

	return transformedData;
}
