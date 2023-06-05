import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import SubHeader from '@/components/Header/SubHeader';
import { getEmployees } from '@/queries/employee.query';

import { Employee } from '@/appTypes/employee';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const EmployeesList: React.FC<Props> = ({ ...props }) => {
	const router = useRouter();

	const {
		isLoading,
		isError,
		// error,
		isSuccess,
		data: employees,
	} = useQuery({
		queryKey: ['getEmployees'],
		queryFn: getEmployees,
	});

	const editEmployee = useCallback(
		(e: React.SyntheticEvent<HTMLDivElement>) => {
			const id = e.currentTarget.dataset.id;
			router.push(`/employees/${id}`);
		},
		[router]
	);

	if (isError) return <div>There has been an error</div>;
	if (isLoading) return <div>Loading...</div>;

	if (isSuccess)
		return (
			<div {...props} className="">
				<SubHeader
					title="Employees"
					link="/employees/new"
					linkTitle="Add Employee"
				/>

				<div className="flex flex-row border-b-2 border-orange-500 py-2 px-2">
					<div className="basis-3/5 font-bold">Name</div>
					<div className="basis-2/5 font-bold">Position</div>
				</div>

				{employees?.map((employee: Employee) => {
					// Transformations

					return (
						<div
							key={employee.id}
							className="flex flex-row border-b-2 border-indigo-500 py-4 px-2 cursor-pointer hover:bg-slate-50"
							data-id={employee.id}
							onClick={editEmployee}
						>
							<div className="basis-3/5">
								{employee.name} {employee.surname}
							</div>
							<div className="basis-2/5">{employee.position}</div>
						</div>
					);
				})}
			</div>
		);

	return null;
};

export default EmployeesList;
