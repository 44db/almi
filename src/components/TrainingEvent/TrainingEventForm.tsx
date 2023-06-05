import React, { useState, useCallback, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainingEvent } from '@/appTypes/training-event';
import { Employee, EmployeeOption } from '@/appTypes/employee';
import { Training } from '@/appTypes/training';
import { Facilitator } from '@/appTypes/facilitator';

import { getTrainings } from '@/queries/training.query';
import { getFacilitators } from '@/queries/facilitator.query';
import { getEmployees } from '@/queries/employee.query';
import {
	postTrainingEvent,
	putTrainingEvent,
	deleteTrainingEvent,
} from '@/queries/training-event.query';

import FormHeader from '@/components/UIForm/FormHeader';
import FormWrap from '@/components/UIForm/FormWrap';
import SelectInput from '@/components/UIForm/SelectInput';
import Input from '@/components/UIForm/Input';
import Submit from '@/components/UIForm/Submit';
import Delete from '@/components/UIForm/Delete';
import Status from '@/components/UIForm/Status';

import EmployeeCard from '@/components/TrainingEvent/EmployeeCard';

interface Props {
	trainingEvent?: TrainingEvent | null;
}

interface TrainingOption extends Training {
	value?: number;
	label?: string;
}

interface FacilitatorOption extends Facilitator {
	value?: number;
	label?: string;
}



const TrainingEventForm: React.FC<Props> = ({ trainingEvent, ...props }) => {
	
	const router = useRouter();
	const queryClient = useQueryClient();

	// Data Fetching
	// *************
	const { isLoading: isLoadingTrainings, data: trainings } = useQuery({
		queryKey: ['getTrainings'],
		queryFn: () => getTrainings(),
	});

	const { isLoading: isLoadingFacilitators, data: facilitators } = useQuery({
		queryKey: ['getFacilitators'],
		queryFn: () => getFacilitators(),
	});

	const { isLoading: isLoadingEmployees, data: employees } = useQuery({
		queryKey: ['getEmployees'],
		queryFn: () => getEmployees(),
	});

	// Form State
	// **********
	const [eventName, setEventName] = useState<string>('');
	const [eventDate, setEventDate] = useState<Date>(new Date());
	const [eventEmployees, setEventEmployees] = useState<EmployeeOption[]>();
	const [eventTrainings, setEventTrainings] = useState<TrainingOption[]>();
	const [eventFacilitator, setEventFacilitator] =
		useState<FacilitatorOption>();

	const [disabledForm, setDisabledForm] = useState<boolean>(false);

	useEffect(() => {
		if (!trainingEvent) return;

		setEventName(trainingEvent.name);

		// Transformations for existing training event data
		setEventDate(new Date(trainingEvent.date));

		setEventTrainings(
			trainingEvent.trainings.map((training: Training) => {
				return {
					...training,
					value: training.id,
					label: training.name,
				};
			})
		);

		setEventFacilitator({
			...trainingEvent.facilitator,
			value: trainingEvent.facilitator.id,
			label: trainingEvent.facilitator.name,
		});

		setEventEmployees(
			trainingEvent.employees.map((employee: Employee) => {
				return {
					...employee,
					value: employee.id,
					label: `${employee.name} ${employee.surname}`,
				};
			})
		);
	}, [trainingEvent]);

	// Transformations
	// ***************
	const transformTrainings = trainings?.map((training: Training) => ({
		...training,
		value: training.id,
		label: training.name,
	}));

	const transformFacilitators = facilitators?.map(
		(facilitator: Facilitator) => ({
			...facilitator,
			value: facilitator.id,
			label: facilitator.name,
		})
	);

	const transformEmployees = employees?.map((employee: Employee) => ({
		...employee,
		value: employee.id,
		label: `${employee.name} ${employee.surname}`,
	}));

	// Mutations
	const mutateTrainingEvent = useMutation({
		// PUT or POST depending on whether we have a trainingEvent or not
		mutationFn: (newTrainingEvent: any) => {
			return trainingEvent
				? putTrainingEvent(trainingEvent.id, newTrainingEvent)
				: postTrainingEvent(newTrainingEvent);
		},
		mutationKey: trainingEvent
			? ['putTrainingEvent']
			: ['postTrainingEvent'],
		onMutate: async (newTrainingEvent: any) => {
			// console.log('onMutate', newTrainingEvent);
			// If we are adding a new training event .. redirect to training events page
			// if (!trainingEvent) {

			queryClient.invalidateQueries({ queryKey: ['getTrainingEvents'] })
				router.push('/training-events');
			// }
		},
		onError: (error: any) => {
			console.log('Mutation error', error);
		},
	});

	const deleteTraining = useMutation({
		mutationFn: () => deleteTrainingEvent(trainingEvent?.id ?? 0),
		mutationKey: ['deleteTrainingEvent'],
		onMutate: async (data) => {
			console.log('Delete Event', data);
			router.push('/training-events');
		},
		onError: (error: any) => {
			console.log('Delete Event Error', error);
		},
	});

	useEffect(() => {
		if (deleteTraining.isLoading || mutateTrainingEvent.isLoading)
			setDisabledForm(true);
		else setDisabledForm(false);
	}, [deleteTraining, mutateTrainingEvent]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const payload = {
				employees: eventEmployees?.map((employee: EmployeeOption) => ({
					employeeId: employee.id,
					position: employee.position,
					attendanceType: employee.attendanceType,
				})),
				facilitatorId: eventFacilitator?.id,
				trainings: eventTrainings?.map((training: TrainingOption) => ({
					trainingId: training.id,
				})),
				date: eventDate,
				name: eventName,
			};


			// Validation
			if (payload.name.trim() === '')
				return alert('Please enter a name for the event');

			// Filter empty attendances
			const attendances = payload.employees?.filter((employee: any) => employee.attendanceType === undefined);
			if (attendances && attendances?.length > 0)
				return alert('Please select an attendance type for each employee');

			if (payload.facilitatorId === undefined)
				return alert('Please select a facilitator for the event');
			
			if (payload.trainings?.length === 0)
				return alert('Please select at least one training for the event');
					
			
			mutateTrainingEvent.mutate(payload);

		},
		[
			eventName,
			eventDate,
			eventEmployees,
			eventFacilitator,
			eventTrainings,
			mutateTrainingEvent,
		]
	);

	return (
		<div className="w-full max-w-2xl flex-col m-auto" {...props}>


			<FormHeader	
				newLabel={`New Training Event`}
				editingLabel={`${trainingEvent?.name}`}
				newRecord={!trainingEvent}
			/>

			<FormWrap onSubmit={handleSubmit}>

				<Input
					label={`Event Name`}
					value={eventName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEventName(e.target.value)
					}
					placeholder={`Event Name`}
					disabled={disabledForm}
				/>				

				<div className="mb-4">
					<label className="block text-gray-700 text-m font-bold mb-2">
						Event Date
					</label>
					<DatePicker
						disabled={disabledForm}
						selected={eventDate}
						onChange={(date: Date) => setEventDate(date)}
						dateFormat="dd/MM/yyyy"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<SelectInput
					label={'Employees'}
					name={'employees'}
					instanceId={'employees'}
					isMulti={true}
					isLoading={isLoadingEmployees}
					options={transformEmployees}
					value={eventEmployees}
					isDisabled={disabledForm}
					onChange={(selectedOptions: any) => {
						setEventEmployees(selectedOptions);
					}}
				>

					{eventEmployees?.map((employee: EmployeeOption) => (
						<EmployeeCard 
							key={employee.id}
							employee={employee}
							disabledForm={disabledForm}
							eventEmployees={eventEmployees}
							setEventEmployees={setEventEmployees}
						/>
					))}

				</SelectInput>
							
				<SelectInput 
					label={'Facilitator'}
					name={'facilitators'}
					instanceId={'facilitators'}
					isLoading={isLoadingFacilitators}
					options={transformFacilitators}
					value={eventFacilitator}
					isDisabled={disabledForm}
					onChange={(selectedOption: any) => {
						setEventFacilitator(selectedOption);
					}}
				/>	

				<SelectInput
					label={'Trainings'}
					name={'trainings'}
					instanceId={'trainings'}
					isMulti={true}
					isLoading={isLoadingTrainings}
					options={transformTrainings}
					value={eventTrainings}
					isDisabled={disabledForm}
					onChange={(selectedOptions: any) => {
						setEventTrainings(selectedOptions);
					}}
				/>				

				<div className="flex-row flex justify-between">
					<Submit
						disabled={disabledForm}
						label="Training Event"
						newRecord={!trainingEvent}
						isLoading={mutateTrainingEvent.isLoading}
					/>

					{trainingEvent && (
						<Delete
							label="Delete Training Event"
							disabled={disabledForm}
							onClick={() => {
								if (window.confirm("Are you sure you want to delete this Training Event?")) {
									deleteTraining.mutate();
								}
							}}
						/>
					)}
				</div>

				<Status 
					title='Training Event'
					isLoading={mutateTrainingEvent.isLoading}
					isSuccess={mutateTrainingEvent.isSuccess}
					isIdle={mutateTrainingEvent.isIdle}
				/>
				
			</FormWrap>

		</div>
	);
};

export default TrainingEventForm;
