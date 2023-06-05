import React from 'react';
import Link from 'next/link';
interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<Props> = ({ ...props }) => {
	const itemClass = 'bg-gray-100 hover:bg-gray-300 px-4 py-1 rounded-md m-1';

	return (
		<header
			className="flex justify-between flex-wrap items-center mb-8 bg-zinc-700 rounded-xl px-4 py-4"
			{...props}
		>
			{/* <Link className={itemClass} href="/">Home</Link> */}
			<Link
				href="/"
				className="flex items-center space-x-2 text-white bg-fuchsia-500 px-4 py-2 rounded-lg"
			>
				<svg
					className="h-5 w-5 text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a1 1 0 0 1-1-1V9h2v8a1 1 0 0 1-1 1zm6-6a1 1 0 0 1-1-1V5.41l-5.3 5.3a2 2 0 0 1-2.83 0L5 11.41V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.41l-1.3-1.3a2 2 0 0 1 0-2.83l5.3-5.3H18a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1z"
						clip-rule="evenodd"
					/>
				</svg>
				<span>Home</span>
			</Link>
			<Link className={itemClass} href="/trainings">
				Trainings
			</Link>
			<Link className={itemClass} href="/training-events">
				Training Events
			</Link>
			<Link className={itemClass} href="/employees">
				Employees
			</Link>
			<Link className={itemClass} href="/facilitators">
				Facilitators
			</Link>
			<Link className={itemClass} href="/reports">
				Reports
			</Link>
		</header>
	);
};

export default Header;
