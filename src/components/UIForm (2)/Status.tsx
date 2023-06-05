import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	isLoading: boolean;
	isSuccess: boolean;
	isIdle: boolean;
}

const Status: React.FC<Props> = ({ isIdle, isLoading, isSuccess, ...props }) => {
	if (isIdle) return null;

	return(
		<div className="mt-8 bg-orange-400 py-2 px-4 flex-column text-white font-bold rounded-l">
			{isLoading && <p>Saving Data</p>}
			{isSuccess && <p>Data Saved</p>}
		</div>
	)
}

export default Status