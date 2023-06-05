import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	editingLabel: string
	newLabel: string
	newRecord: boolean
}

const FormHeader: React.FC<Props> = ({ editingLabel, newLabel, newRecord,...props }) => {
	return(
		<div className="text-xl font-bold mb-6 text-blue-950" {...props}>
			{ newRecord
				? newLabel
				: `Editing ${editingLabel}`
			}
		</div>
	)
};

export default FormHeader;