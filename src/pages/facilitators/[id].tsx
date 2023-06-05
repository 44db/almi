import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getFacilitator } from '@/queries/facilitator.query';
// import { Facilitator } from '@/appTypes/facilitator';

import FacilitatorForm from '@/components/Facilitator/FacilitatorForm';

export default function EmployeePage() {
	const router = useRouter();

	const query = useQuery({
		queryKey: ['getFacilitator', Number(router.query.id)],
		queryFn: () => getFacilitator(Number(router.query.id)),
		enabled: !!router.query.id && router.query.id !== 'new',
	});

	if (router.query.id === 'new') return <FacilitatorForm />;

	return (
		<div className="">
			{query.isLoading && <div>Loading...</div>}
			{query.isError && <div>Error</div>}
			{query.isSuccess && <FacilitatorForm facilitator={query.data} />}
		</div>
	);
}
