import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Training, Facilitator } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import SubHeader from '@/components/Header/SubHeader';
import { getTrainings } from '@/queries/training.query';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

interface TrainingListProps extends Training {
	facilitator: Facilitator;
}

const TrainingsList: React.FC<Props> = ({ ...props }) => {
	const router = useRouter();

	const {
		isLoading,
		isError,
		// error,
		isSuccess,
		data: trainingEvents,
	} = useQuery({
		queryKey: ['getTrainings'],
		queryFn: getTrainings,
	});

	const editTraining = useCallback(
		(e: React.SyntheticEvent<HTMLDivElement>) => {
			const id = e.currentTarget.dataset.id;
			router.push(`/trainings/${id}`);
		},
		[router]
	);

	if (isError) return <div>There has been an error</div>;
	if (isLoading) return <div>Loading...</div>;

	if (isSuccess)
		return (
			<div {...props} className="">
				<SubHeader
					title="Trainings"
					link="/trainings/new"
					linkTitle="Add Training"
				/>

				<div className="flex flex-row border-b-2 border-orange-500 py-2 px-2">
					<div className="basis-2/5 font-bold">Name</div>
				</div>

				{trainingEvents?.map((training: TrainingListProps) => {
					// Transformations

					return (
						<div
							key={training.id}
							className="flex flex-row border-b-2 border-indigo-500 py-4 px-2 cursor-pointer hover:bg-slate-50"
							data-id={training.id}
							onClick={editTraining}
						>
							<div className="basis-2/5">{training.name}</div>
						</div>
					);
				})}
			</div>
		);

	return null;
};

export default TrainingsList;
