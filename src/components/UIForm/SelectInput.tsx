import React from 'react';
import Select, { Props as SelectProps } from 'react-select';

interface Props extends Omit<SelectProps, 'children'> {
	label: string;
	children?: React.ReactNode;
}


const SelectInput: React.FC<Props> = ({ children, label, ...props }) => {
	return(
		<div className="mb-4">
			<label className="block text-gray-700 text-m font-bold mb-2">{ label }</label>
			<Select {...props} />
			{ children }
		</div>
	)
}

export default SelectInput;