import React from 'react';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode;
}

const FormWrap: React.FC<Props> = ({ children, ...props }) => {
	return(
		<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			{children}
		</form>
	)
}

export default FormWrap;