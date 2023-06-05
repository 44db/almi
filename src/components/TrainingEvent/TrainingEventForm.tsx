import React, { useState, useCallback, useEffect } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useQuery, useMutation } from '@tanstack/react-query';

import { TrainingEvent } from '@/appTypes/training-event';
import { Employee } from '@/appTypes/employee';
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

interface EmployeeOption extends Employee {
	value?: number;
	label?: string;
}

const TrainingEventForm: React.FC<Props> = ({ trainingEvent, ...props }) => {
	const router = useRouter();

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
		label: employee.name,
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
			console.log('onMutate', newTrainingEvent);
			// If we are adding a new training event .. redirect to training events page
			if (!trainingEvent) {
				router.push('/training-events');
			}
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
			<h2 className="text-xl font-bold mb-6 text-blue-950">
				{trainingEvent
					? `Editing ${trainingEvent.name}`
					: 'New Training Event'}
			</h2>

			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-m font-bold mb-2">
						Event Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						value={eventName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEventName(e.target.value)
						}
						placeholder="Event Name"
						disabled={disabledForm}
					/>
				</div>

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

				<div className="mb-4">
					<label className="block text-gray-700 text-m font-bold mb-2">
						Trainings
					</label>
					<Select
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
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-m font-bold mb-2">
						Facilitators
					</label>
					<Select
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
				</div>

				<div className="mb-4">
					<label className="block text-gray-700 text-m font-bold mb-2">
						Employees
					</label>
					<Select
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
					/>

					{eventEmployees?.map((employee: EmployeeOption) => (
						<div key={employee.id} className="mb-6 pl-4 border-l-4">
							<h3 className="text-gray-600 text-m font-bold mb-2 mt-3">
								{employee.label}
							</h3>
							<label className="block text-gray-700 text-sm font-semibold mb-2">
								Position
							</label>
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								value={employee.position}
								disabled={disabledForm}
								onChange={(e) =>
									setEventEmployees(
										eventEmployees.map(
											(emp: EmployeeOption) =>
												emp.value === employee.value
													? {
															...emp,
															position:
																e.target.value,
													}
													: emp
										)
									)
								}
								placeholder="Position"
							/>

							<div className="mt-4">
								<h3 className="block text-gray-700 text-sm font-semibold mb-2">
									Attendance
								</h3>

								<label className="block text-gray-700 text-sm mb-2">
									<input
										className="mr-1"
										type="radio"
										name={`attendanceType-${employee.value}`}
										value="Physically"
										checked={
											employee.attendanceType ===
											'Physically'
										}
										disabled={disabledForm}
										onChange={(e) =>
											setEventEmployees(
												eventEmployees.map(
													(emp: EmployeeOption) =>
														emp.value ===
														employee.value
															? {
																	...emp,
																	attendanceType:
																		e.target
																			.value,
															}
															: emp
												)
											)
										}
									/>
									Physically
								</label>

								<label className="block text-gray-700 text-sm mb-2">
									<input
										className="mr-1"
										type="radio"
										name={`attendanceType-${employee.value}`}
										value="Remotely"
										disabled={disabledForm}
										checked={
											employee.attendanceType ===
											'Remotely'
										}
										onChange={(e) =>
											setEventEmployees(
												eventEmployees.map(
													(emp: EmployeeOption) =>
														emp.value ===
														employee.value
															? {
																	...emp,
																	attendanceType:
																		e.target
																			.value,
															}
															: emp
												)
											)
										}
									/>
									Remotely
								</label>
							</div>
						</div>
					))}
				</div>

				<div className="flex-row flex justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
						type="submit"
						disabled={disabledForm}
					>
						{mutateTrainingEvent.isLoading
							? 'Saving...'
							: trainingEvent
							? 'Update Event'
							: 'Add Event'}
					</button>

					{trainingEvent && (
						<button
							className="bg-red-500 hover:bg-red-800 text-white font-bold py2 px-4 rounded focus:outline-none focuse:shadow-outline disabled:bg-red-300"
							type="button"
							disabled={disabledForm}
							onClick={() => {
								deleteTraining.mutate();
							}}
						>
							Delete Event
						</button>
					)}
				</div>

				{mutateTrainingEvent.isIdle === false && (
					<div className="mt-4 bg-gray-400 py-2 px-4 flex-column text-gray-700">
						{mutateTrainingEvent.isLoading && <p>Saving Data</p>}
						{mutateTrainingEvent.isSuccess && <p>Data Saved</p>}
					</div>
				)}
			</form>
		</div>
	);
};

export default TrainingEventForm;
