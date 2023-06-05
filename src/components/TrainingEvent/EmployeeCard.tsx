import { EmployeeOption } from '@/appTypes/employee';
import React from 'react';
import Input from '@/components/UIForm/Input';
import Attendance from '@/components/TrainingEvent/Attendance';

interface EmployeeCardProps {
	employee: EmployeeOption;
	disabledForm: boolean;
	eventEmployees: EmployeeOption[];
	setEventEmployees: (employees: EmployeeOption[]) => void;
}


const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, disabledForm, eventEmployees, setEventEmployees }) => {
	return (
		<div key={employee.id} className="mb-6 pl-4 border-l-4">
			<h3 className="text-gray-900 text-m font-bold mb-2 mt-3">
				{employee.name} {employee.surname}
			</h3>

			<Input
				label="Position"
				type="text"
				value={employee.position}
				disabled={disabledForm}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEventEmployees(
						eventEmployees.map(
							(emp: EmployeeOption) =>
								emp.value === employee.value
									? { ...emp, position: e.target.value, }
									: emp
						)
					)
				}
				placeholder="Position"
			/>

			<Attendance 
				key={employee.id}
				employee={employee}
				disabledForm={disabledForm}
				eventEmployees={eventEmployees}
				setEventEmployees={setEventEmployees}
			/>
		</div>
	);
};

export default EmployeeCard;
