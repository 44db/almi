import React from 'react';
import GenericList from '@/components/UIList/GenericList';
import { getFacilitators } from '@/queries/facilitator.query';

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const Employees: React.FC<Props> = ({ ...props }) => {
	return (
		<div {...props}>

			<GenericList 
				queryKey={['getFacilitators']}
				queryFn={getFacilitators}
				formatData={(facilitator) => (
					<>
						<div className="basis-3/5">{facilitator.name}</div>						
					</>
				)}
				formatHeader={() => (
					<>
						<div className="basis-3/5 font-bold">Name</div>						
					</>
				)}
				title="Facilitators"
				newLink="/facilitators/new"
				newLinkTitle="Add Facilitator"
				editLinkBase="/facilitators"
			/>
			
		</div>
	);
};

export default Employees;
