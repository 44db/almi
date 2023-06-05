import React from 'react';
import TrainingEventForm from '@/components/TrainingEvent/TrainingEventForm';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getTrainingEvent } from '@/queries/training-event.query';
// import { TrainingEvent } from '@/types/training-event';

export default function TrainingEventPage() {
	const router = useRouter();

	const query = useQuery({
		queryKey: ['getTrainingEvent', Number(router.query.id)],
		queryFn: () => getTrainingEvent(Number(router.query.id)),
		enabled: !!router.query.id && router.query.id !== 'new',
	});

	if (router.query.id === 'new') return <TrainingEventForm />;

	return (
		<div className="">
			{query.isLoading && <div>Loading...</div>}
			{query.isError && <div>Error</div>}
			{query.isSuccess && (
				<TrainingEventForm trainingEvent={query.data} />
			)}

			{/* { query.isSuccess && 
				<>
					<h1 className="font-extrabold text-2xl text-orange-700">{ query.data.name }</h1>
					<h2 className="font-bold">Employees</h2>
					<div>{ query.data.employees.map( (e:any) => (<p key={e.id}>{e.name}</p>)) }</div> 
					<h2 className="font-bold">Trainings</h2>
					<div>{ query.data.trainings.map( (e:any) => (<p key={e.id}>{e.name}</p>)) }</div>
				</> 
			} */}

			{/* { query.isSuccess && query.data.map((trainingEvent:TrainingEvent) => (
				<div key={trainingEvent.id}>{trainingEvent.name}</div>
			))} */}
		</div>
	);
}
