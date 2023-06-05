import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';

import { useQuery } from '@tanstack/react-query';

import { getReports } from '@/queries/report.query';

export default function Reports() {
		
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection'
		}
	]);

	const query = useQuery({
		queryKey: ['reports', [state[0].startDate, state[0].endDate]],
		queryFn: () => getReports({ startDate: state[0].startDate, endDate: state[0].endDate}),
	})
	

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
				// direction="vertical"
			/> 

			{/* <pre className="whitespace-pre-wrap mt-8">{ JSON.stringify(state) }</pre> */}
			{/* <Calendar /> */}

			<div>
				{ query.isLoading && 'Loading...' }
				{ query.isError && 'Error' }
				{ query.isSuccess && (
					<>
						<h3 className="text-l font-bold">Number of Training Events by Employee for a specified period</h3>
						{ Object.entries(query.data.trainingCountByEmployee).map(([key, value]) => {
							return <p key={key}>Employee with id {key} went to { value } Training Event(s)</p>
						}) }

						<h3 className="mt-3 text-l font-bold">Number of Training Events by Position for a specified period</h3>
						{ Object.entries(query.data.trainingCountByPosition).map(([key, value]) => {
							return <p key={key}>Employee position {key} went to { value } Training Event(s)</p>
						}) }

						<h3 className="mt-3 text-l font-bold">Number of Training Events by Facilitator for a specified period</h3>
						{ Object.entries(query.data.trainingCountByFacilitator).map(([key, value]) => {
							return <p key={key}>Facilitator {key} organized { value } Training Event(s)</p>
						}) }


					</>
				)}													
			</div>

		</div>
	)
}