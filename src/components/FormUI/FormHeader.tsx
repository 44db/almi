import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	editingLabel: string
	newLabel: string
	newRecord: boolean
}

const FormHeader: React.FC<Props> = ({ editingLabel, newLabel, newRecord,...props }) => {
	return(
		<div className="text-xl font-bold mb-6 text-blue-950">
			{ newRecord
				? `Editing ${editingLabel}`
				: newLabel
			}
		</div>
	)
};

export default FormHeader;