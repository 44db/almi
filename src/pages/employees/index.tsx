import React from 'react';
import GenericList from '@/components/UIList/GenericList';
import { getEmployees } from '@/queries/employee.query';

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const Employees: React.FC<Props> = ({ ...props }) => {
	return (
		<div {...props}>

			<GenericList 
				queryKey={['getEmployees']}
				queryFn={getEmployees}
				formatData={(employee) => (
					<>
						<div className="basis-3/5">{employee.name} {employee.surname}</div>
						<div className="basis-2/5">{employee.position}</div>
					</>
				)}
				formatHeader={() => (
					<>
						<div className="basis-3/5 font-bold">Full Name</div>
						<div className="basis-2/5 font-bold">Position</div>
					</>
				)}
				title="Employees"
				newLink="/employees/new"
				newLinkTitle="Add Employee"
				editLinkBase="/employees"
			/>
			
		</div>
	);
};

export default Employees;
