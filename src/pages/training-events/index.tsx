import GenericList from "@/components/UIList/GenericList";
import { getTrainingEvents } from "@/queries/training-event.query";


export default function TrainingEvents() {

	const formattedDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	}
	

	return (
		<div className="">
			
			<GenericList 
				queryKey={['getTrainingEvents']}
				queryFn={getTrainingEvents}
				formatData={(trainingEvent) => (
					<>
						<div className="basis-2/5">{trainingEvent.name}</div>
						<div className="basis-1/5">{formattedDate(trainingEvent.date)}</div>
						<div className="basis-2/5">{trainingEvent.facilitator.name}</div>
					</>
				)}
				formatHeader={() => (
					<>
							<div className="basis-2/5 font-bold">Name</div>
							<div className="basis-1/5 font-bold">Date</div>
							<div className="basis-2/5 font-bold">Facilitator</div>
					</>
				)}
				title="Training Events"
				newLink="/training-events/new"
				newLinkTitle="Add Training Event"
				editLinkBase="/training-events"
			/>


		</div>
	);
}
