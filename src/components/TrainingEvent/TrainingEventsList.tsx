import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { TrainingEvent, Facilitator } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getTrainingEvents } from '@/queries/training-event.query';
import SubHeader from '@/components/Header/SubHeader';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

interface TrainingEventListProps extends TrainingEvent {
	facilitator: Facilitator;
}

const TrainingEventsList: React.FC<Props> = ({ ...props }) => {
	const router = useRouter();

	const {
		isLoading,
		isError,
		// error,
		isSuccess,
		data: trainingEvents,
	} = useQuery({
		queryKey: ['getTrainingEvents'],
		queryFn: getTrainingEvents,
	});

	const editTrainingEvent = useCallback(
		(e: React.SyntheticEvent<HTMLDivElement>) => {
			const id = e.currentTarget.dataset.id;
			router.push(`/training-events/${id}`);
		},
		[router]
	);

	if (isError) return <div>There has been an error</div>;
	if (isLoading) return <div>Loading...</div>;

	if (isSuccess)
		return (
			<div {...props} className="">
				<SubHeader
					title="Training Events"
					link="/training-events/new"
					linkTitle="Add Training Event"
				/>

				<div className="flex flex-row border-b-2 border-orange-500 py-2 px-2">
					<div className="basis-2/5 font-bold">Name</div>
					<div className="basis-1/5 font-bold">Date</div>
					<div className="basis-2/5 font-bold">Facilitator</div>
				</div>

				{trainingEvents?.map(
					(trainingEvent: TrainingEventListProps) => {
						// Transformations
						const date = new Date(trainingEvent.date);
						const formatedDate =
							date.getDate() +
							'/' +
							date.getMonth() +
							1 +
							'/' +
							date.getFullYear();

						return (
							<div
								key={trainingEvent.id}
								className="flex flex-row border-b-2 border-indigo-500 py-4 px-2 cursor-pointer hover:bg-slate-50"
								data-id={trainingEvent.id}
								onClick={editTrainingEvent}
							>
								<div className="basis-2/5">
									{trainingEvent.name}
								</div>
								<div className="basis-1/5">{formatedDate}</div>
								<div className="basis-2/5">
									{trainingEvent.facilitator.name}
								</div>
							</div>
						);
					}
				)}
			</div>
		);

	return null;
};

export default TrainingEventsList;
