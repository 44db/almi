import Image from 'next/image';
export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center py-2">			
			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center max-w-2xl">
				<Image src="/Almi-Tankers-Logo_1200x279px-1-1024x238-no-bg.png" alt="Almi Tankers Logo" width={1024} height={238} />
				<h1 className="mt-4 text-2xl font-extrabold">HR Department</h1>
				<h2 className="mt-2 text-xl">Application to monitor employee trainings.</h2>
			</main>
		</div>
	);
}
