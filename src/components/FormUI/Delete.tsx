import React from 'react';

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	label: string;
}

const Delete: React.FC<Props> = ({ label, ...props }) => {
	return (
		<button
			className="bg-red-500 hover:bg-red-800 text-white font-bold py2 px-4 rounded focus:outline-none focuse:shadow-outline disabled:bg-red-300"
			type="button"
			{...props}
		>
			{label}
		</button>
	);
};

export default Delete;
