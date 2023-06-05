import React from 'react';
// import styles from './Layout.module.scss';

import Header from '@/components/Header/Header';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, ...props }) => {
	return (
		<div className="container mx-auto px-4 py-8" {...props}>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
