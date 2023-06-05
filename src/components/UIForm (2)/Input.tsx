import React from 'react';

interface Props extends React.AllHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input: React.FC<Props> = ({ label, ...props }) => {

	const type = props.type ?? 'text';

	return (
		<div className="mb-4">
			<label className="block text-gray-700 text-m font-bold mb-2">
				{label}
			</label>
			<input
				className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"				
				type={type}
				{...props}				
			/>
		</div>
	);
};

export default Input;
