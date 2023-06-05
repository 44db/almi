export interface Employee {
	id?: number;
	name: string;
	surname: string;
	position: string;
	attendanceType?: string;
}

export interface EmployeeOption extends Employee {
	value?: number;
	label?: string;
}