import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getTraining } from '@/queries/training.query';
import { Training } from '@/appTypes/training';

import TrainingForm from '@/components/Training/TrainingForm';

export default function TrainingPage() {
	const router = useRouter();

	const query = useQuery({
		queryKey: ['getTraining', Number(router.query.id)],
		queryFn: () => getTraining(Number(router.query.id)),
		enabled: !!router.query.id && router.query.id !== 'new',
	});

	if (router.query.id === 'new') return <TrainingForm />;

	return (
		<div className="">
			{query.isLoading && <div>Loading...</div>}
			{query.isError && <div>Error</div>}
			{query.isSuccess && <TrainingForm training={query.data} />}
		</div>
	);
}
