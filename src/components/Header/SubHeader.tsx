import React from 'react';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	link: string;
	linkTitle: string;
}

const SubHeader: React.FC<Props> = ({ title, link, linkTitle, ...props }) => {
	return (
		<div className="flex-row flex justify-between items-center mb-4">
			<h1 className="text-xl font-bold mb-4">{title}</h1>
			<Link
				className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
				href={link}
			>
				{linkTitle}
			</Link>
		</div>
	);
};

export default SubHeader;
