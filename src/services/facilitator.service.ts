import {
	getFacilitators as getAllFacilitatorsData,
	getFacilitator as getFacilitatorData,
	postFacilitator as postFacilitatorData,
	updateFacilitator as updateFacilitatorData,
	deleteFacilitator as deleteFacilitatorData,
} from '@/data/facilitator.data';

export async function getFacilitators() {
	// Perform any necessary business logic or validation

	// Call the repository method
	const facilitators = await getAllFacilitatorsData();

	// Transform the data before returning it
	const transformedData = facilitators.map((facilitator) => {
		return facilitator;
	});

	return transformedData;
}

export async function getFacilitator({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const facilitator = await getFacilitatorData({ id });

	// Transform the data before returning it
	const transformedData = {
		...facilitator,
	};

	return transformedData;
}

export async function postFacilitator(facilitator: any) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const newFacilitator = await postFacilitatorData(facilitator);

	// Transform the data before returning it
	const transformedData = {
		...newFacilitator,
	};

	return transformedData;
}

export async function updateFacilitator({ id, body }: { id: number; body: any }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const updatedFacilitator = await updateFacilitatorData({ id, body });

	// Transform the data before returning it
	const transformedData = {
		...updatedFacilitator,
	};

	return transformedData;
}

export async function deleteFacilitator({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const deletedFacilitator = await deleteFacilitatorData({ id });

	// Transform the data before returning it
	const transformedData = {
		...deletedFacilitator,
	};

	return transformedData;
}
