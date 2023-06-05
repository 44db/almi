import { getFacilitators as getAllFacilitatorsData } from '@/data/facilitator.data';

export async function getAllFacilitators() {
	// Perform any necessary business logic or validation

	// Call the repository method
	const facilitators = await getAllFacilitatorsData();

	// Transform the data before returning it
	const transformedData = facilitators.map((fascilitator) => {
		return fascilitator;
	});

	return transformedData;
}
