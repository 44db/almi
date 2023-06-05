import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getEmployee } from '@/queries/employee.query';
import { Employee } from '@/appTypes/employee';

import EmployeeForm from '@/components/Employee/EmployeeForm';

export default function EmployeePage() {
	const router = useRouter();

	const query = useQuery({
		queryKey: ['getEmployee', Number(router.query.id)],
		queryFn: () => getEmployee(Number(router.query.id)),
		enabled: !!router.query.id && router.query.id !== 'new',
	});

	if (router.query.id === 'new') return <EmployeeForm />;

	return (
		<div className="">
			{query.isLoading && <div>Loading...</div>}
			{query.isError && <div>Error</div>}
			{query.isSuccess && <EmployeeForm employee={query.data} />}
		</div>
	);
}
