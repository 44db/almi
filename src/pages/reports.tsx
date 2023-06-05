import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';

import { useQuery } from '@tanstack/react-query';

import { getReportTrainingCountByEmployee, getReportTrainingCountByPosition, getReportTrainingCountByFacilitator } from '@/queries/report.query';

export default function Reports() {
		
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection'
		}
	]);

	
	const queryTrainingCountByEmployee = useQuery({
		queryFn: () => getReportTrainingCountByEmployee({ startDate: state[0].startDate, endDate: state[0].endDate}),
		queryKey: ['getReportTrainingCountByEmployee', [state[0].startDate, state[0].endDate]],
	});

	const queryTrainingCountByPosition = useQuery({
		queryFn: () => getReportTrainingCountByPosition({ startDate: state[0].startDate, endDate: state[0].endDate}),
		queryKey: ['getReportTrainingCountByPosition', [state[0].startDate, state[0].endDate]],
	});

	const queryTrainingCountByFacilitator = useQuery({
		queryFn: () => getReportTrainingCountByFacilitator({ startDate: state[0].startDate, endDate: state[0].endDate}),
		queryKey: ['getReportTrainingCountByFacilitator', [state[0].startDate, state[0].endDate]],
	});
	

	return(
		<div>
			<h1 className="text-xl font-bold text-center text-indigo-900 pb-3 border-b-4">Reports</h1>
			<p className="mt-2">Select a range and see the reports:</p>

			<DateRangePicker
				className="mt-8"
				onChange={ (item:any) => setState([item.selection])}
				moveRangeOnFirstSelection={false}
				retainEndDateOnFirstSelection={false}
				showMonthAndYearPickers={false}
				showMonthArrow={true}
				showDateDisplay={true}
				showPreview={true}								
				months={1}
				ranges={state}				
			/> 

			<div>

				<h2 className="text-l font-bold mt-4">Number of Training Events between {state[0].startDate.toLocaleDateString()} - {state[0].endDate.toLocaleDateString()}</h2>

				<h3 className="text-l font-bold mt-3">By Employee </h3>
				{ queryTrainingCountByEmployee.isLoading && 'Loading...' }
				{ queryTrainingCountByEmployee.isError && 'Error' }
				{ queryTrainingCountByEmployee.isSuccess && (
					<>						
						{ Object.entries(queryTrainingCountByEmployee.data).map(([key, employee]:any) => {
							return <p key={key}>{employee.name} {employee.surname}: {employee.count}</p>
						})}
					</>
				)}

				<h3 className="mt-3 text-l font-bold">By Position</h3>
				{ queryTrainingCountByPosition.isLoading && 'Loading...' }
				{ queryTrainingCountByPosition.isError && 'Error' }
				{ queryTrainingCountByPosition.isSuccess && (
					<>
						{ Object.entries(queryTrainingCountByPosition.data).map(([key, value]:any) => {
							return <p key={key}>{key}: { value }</p>
						}) }
					</>
				)}

				<h3 className="mt-3 text-l font-bold">By Facilitator</h3>
				{ queryTrainingCountByFacilitator.isLoading && 'Loading...' }
				{ queryTrainingCountByFacilitator.isError && 'Error' }
				{ queryTrainingCountByFacilitator.isSuccess && (
					<>
						{ Object.entries(queryTrainingCountByFacilitator.data).map(([key, value]:any) => {
							return <p key={key}>{key}: { value }</p>
						}) }
					</>
				)}								
			</div>

		</div>
	)
}