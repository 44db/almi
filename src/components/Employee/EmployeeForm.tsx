import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Employee } from '@/appTypes/employee';

import { putEmployee, postEmployee, deleteEmployee } from '@/queries/employee.query';

import FormHeader from '@/components/FormUI/FormHeader';
import FormWrap from '@/components/FormUI/FormWrap';
import Input from '@/components/FormUI/Input';
import Submit from '@/components/FormUI/Submit';
import Delete from '@/components/FormUI/Delete';
import Status from '@/components/FormUI/Status';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	employee?: Employee;
}

const EmployeeForm: React.FC<Props> = ({ employee, ...props }) => {
	const router = useRouter();

	// Form State
	// **********	
	const [employeeName, setEmployeeName] = useState<string>('');
	const [employeeSurname, setEmployeeSurname] = useState<string>('');
	const [employeePosition, setEmployeePosition] = useState<string>('');

	const [disabledForm, setDisabledForm] = useState<boolean>(false);

	useEffect(() => {
		if (!employee) return;
		setEmployeeName(employee.name);
		setEmployeeSurname(employee.surname);
		setEmployeePosition(employee.position);
	}, [employee]);


	// Mutations
	// *********
	const mutateEmployee = useMutation({
		// PUT or POST depending on whether we have an employee or not
		mutationFn: (newEmployee: any) => {
			return employee
				? putEmployee(employee.id ?? 0, newEmployee)
				: postEmployee(newEmployee);
		},
		mutationKey: employee ? ['putTraining', employee.id] : ['postTraining'],
		onMutate: async () => {
			if (!employee) {
				router.push('/employees');
			}
		},
		onError: (error) => {
			console.error('Mutation error', error);
		},
	});

	const delEmployee = useMutation({
		mutationFn: () => deleteEmployee(employee?.id ?? 0),
		mutationKey: ['deleteEmployee', employee?.id],
		onMutate: async () => {		
			router.push('/employees');
		},
		onError: (error: any) => {
			console.error('Delete Employee Error', error);
		},
	});

	useEffect(() => {
		if (delEmployee.isLoading || mutateEmployee.isLoading)
			setDisabledForm(true);
		else setDisabledForm(false);
	}, [delEmployee, mutateEmployee]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const payload = {
				name: employeeName,
				surname: employeeSurname,
				position: employeePosition,
			};

			mutateEmployee.mutate(payload);
		},
		[employeeName, employeeSurname, employeePosition, mutateEmployee]
	);

	return (
		<div className="w-full max-w-2xl flex-col m-auto" {...props}>

			<FormHeader	
				newLabel={`New Employee`}
				editingLabel={`Editing ${employee?.name} ${employee?.surname}`}
				newRecord={!employee}
			/>			

			<FormWrap onSubmit={handleSubmit}>
			
				<Input
					label="Employee Name"
					value={employeeName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmployeeName(e.target.value)
					}
					placeholder="Employee Name"
					disabled={disabledForm}
				/>

				<Input
					label="Employee Surname"
					value={employeeSurname}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmployeeSurname(e.target.value)
					}
					placeholder="Employee Name"
					disabled={disabledForm}
				/>

				<Input
					label="Employee Position"
					value={employeePosition}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmployeePosition(e.target.value)
					}
					placeholder="Employee Position"
					disabled={disabledForm}
				/>

				<div className="flex-row flex justify-between">
					<Submit
						disabled={disabledForm}
						label="Employee"
						newRecord={!employee}
						isLoading={mutateEmployee.isLoading}
					/>

					{employee && (
						<Delete
							label="Delete Employee"
							disabled={disabledForm}
							onClick={() => {
								delEmployee.mutate();
							}}
						/>
					)}
				</div>

				<Status
					isIdle={mutateEmployee.isIdle}
					isLoading={mutateEmployee.isLoading}
					isSuccess={mutateEmployee.isSuccess}
				/>

			</FormWrap>

		</div>
	);
};

export default EmployeeForm;
