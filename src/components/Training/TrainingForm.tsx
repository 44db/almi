import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Training } from '@/appTypes/training';
import {
	putTraining,
	postTraining,
	deleteTraining,
} from '@/queries/training.query';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	training?: Training;
}

const TrainingForm: React.FC<Props> = ({ training, ...props }) => {
	const router = useRouter();

	// Form State
	// **********
	const [trainingName, setTrainingName] = useState<string>('');
	const [disabledForm, setDisabledForm] = useState<boolean>(false);

	useEffect(() => {
		if (!training) return;
		setTrainingName(training.name);
	}, [training]);

	// Mutations
	// *********

	const mutateTraining = useMutation({
		// PUT or POST depending on whether we have a training or not
		mutationFn: (newTraining: any) => {
			return training
				? putTraining(training.id ?? 0, newTraining)
				: postTraining(newTraining);
		},
		mutationKey: training ? ['putTraining', training.id] : ['postTraining'],
		onMutate: async (newTraining) => {
			if (!training) {
				router.push('/trainings');
			}
		},
		onError: (error) => {
			console.error('Mutation error', error);
		},
	});

	const delTraining = useMutation({
		mutationFn: () => deleteTraining(training?.id ?? 0),
		mutationKey: ['deleteTraining', training?.id],
		onMutate: async (data) => {
			console.log('Delete Training', data);
			router.push('/trainings');
		},
		onError: (error: any) => {
			console.log('Delete Training Error', error);
		},
	});

	useEffect(() => {
		if (delTraining.isLoading || mutateTraining.isLoading)
			setDisabledForm(true);
		else setDisabledForm(false);
	}, [delTraining, mutateTraining]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const payload = {
				name: trainingName,
			};

			mutateTraining.mutate(payload);
		},
		[trainingName, mutateTraining]
	);

	return (
		<div className="w-full max-w-2xl flex-col m-auto" {...props}>
			<h2 className="text-xl font-bold mb-6 text-blue-950">
				{training ? `Editing ${training.name}` : 'New Training'}
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
						value={trainingName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTrainingName(e.target.value)
						}
						placeholder="Training Name"
						disabled={disabledForm}
					/>
				</div>

				<div className="flex-row flex justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
						type="submit"
						disabled={disabledForm}
					>
						{mutateTraining.isLoading
							? 'Saving...'
							: training
							? 'Update Training'
							: 'Add Training'}
					</button>

					{training && (
						<button
							className="bg-red-500 hover:bg-red-800 text-white font-bold py2 px-4 rounded focus:outline-none focuse:shadow-outline disabled:bg-red-300"
							type="button"
							disabled={disabledForm}
							onClick={() => {
								delTraining.mutate();
							}}
						>
							Delete Event
						</button>
					)}
				</div>

				{mutateTraining.isIdle === false && (
					<div className="mt-4 bg-gray-400 py-2 px-4 flex-column text-gray-700">
						{mutateTraining.isLoading && <p>Saving Data</p>}
						{mutateTraining.isSuccess && <p>Data Saved</p>}
					</div>
				)}
			</form>
		</div>
	);
};

export default TrainingForm;
