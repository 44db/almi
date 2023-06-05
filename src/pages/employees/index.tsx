import React from 'react';

import EmployeesList from '@/components/Employee/EmployeesList';

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

const Employees: React.FC<Props> = ({ ...props }) => {
	return (
		<div {...props}>
			<EmployeesList />
		</div>
	);
};

export default Employees;
