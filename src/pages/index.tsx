// import styles from '@/styles/Home.module.css';
// import TrainingForm from '@/components/TrainingForm/TrainingForm';
// import TrainingsList from '@/components/TrainingsList/TrainingsList';

import Link from 'next/link';

export default function Home() {
	return (
		<div className="">
			<h1 className="text-xl font-bold">Dashboard</h1>
			<p>
				<Link href="/training-events">Training Events</Link>
			</p>

			{/* <TrainingForm /> */}
			{/* <TrainingsList /> */}
		</div>
	);
}
