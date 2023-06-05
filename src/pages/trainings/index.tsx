import React from 'react';

import TrainingsList from '@/components/Training/TrainingsList';

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const Trainings: React.FC<Props> = ({ ...props }) => {
	return (
		<div {...props}>
			<TrainingsList />
		</div>
	);
};

export default Trainings;
