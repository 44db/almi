import {
	getEmployees as getAllEmployeesData,
	getEmployee as getEmployeeData,
	postEmployee as postEmployeeData,
	updateEmployee as updateEmployeeData,
	deleteEmployee as deleteEmployeeData,
} from '@/data/employee.data';

export async function getEmployees() {
	// Perform any necessary business logic or validation

	// Call the repository method
	const employees = await getAllEmployeesData();

	// Transform the data before returning it
	const transformedData = employees.map((employee) => {
		return employee;
	});

	return transformedData;
}

export async function getEmployee({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const employee = await getEmployeeData({ id });

	// Transform the data before returning it
	const transformedData = {
		...employee,
	};

	return transformedData;
}

export async function postEmployee(employee: any) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const newEmployee = await postEmployeeData(employee);

	// Transform the data before returning it
	const transformedData = {
		...newEmployee,
	};

	return transformedData;
}

export async function updateEmployee({ id, body }: { id: number; body: any }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const updatedEmployee = await updateEmployeeData({ id, body });

	// Transform the data before returning it
	const transformedData = {
		...updatedEmployee,
	};

	return transformedData;
}

export async function deleteEmployee({ id }: { id: number }) {
	// Perform any necessary business logic or validation

	// Call the repository method
	const deletedEmployee = await deleteEmployeeData({ id });

	// Transform the data before returning it
	const transformedData = {
		...deletedEmployee,
	};

	return transformedData;
}
