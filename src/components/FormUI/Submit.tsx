import React from 'react';

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	label: string;
	isLoading: boolean;
	newRecord: boolean; // weather we are creating a new record or updating an existing one
}

const Submit: React.FC<Props> = ({ label, isLoading, newRecord, ...props }) => {
	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
			type="submit"
			{...props}
		>
			{isLoading
				? 'Saving...'
				: newRecord
				? `Add ${label}`
				: `Update ${label}`}
		</button>
	);
};

export default Submit;
