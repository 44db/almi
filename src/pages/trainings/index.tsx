import React from 'react';
import GenericList from '@/components/UIList/GenericList';

import { getTrainings } from '@/queries/training.query';

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const Trainings: React.FC<Props> = ({ ...props }) => {
	return (
		<div {...props}>

		<GenericList 
			queryKey={['getTrainings']}
			queryFn={getTrainings}
			formatData={(training) => (
				<>
					<div className="basis-2/5">{training.name}</div>
				</>
			)}
			formatHeader={() => (
				<>
					<div className="basis-2/5 font-bold">Name</div>
				</>
			)}
			title="Trainings"
			newLink="/trainings/new"
			newLinkTitle="Add Training"
			editLinkBase="/trainings"
		/>


		</div>
	);
};

export default Trainings;
