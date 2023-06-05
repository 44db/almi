import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Training } from '@/appTypes/training';
import { putTraining, postTraining, deleteTraining } from '@/queries/training.query';

import FormHeader from '@/components/UIForm/FormHeader';
import Input from '@/components/UIForm/Input';
import FormWrap from '@/components/UIForm/FormWrap';
import Submit from '@/components/UIForm/Submit';
import Delete from '@/components/UIForm/Delete';
import Status from '@/components/UIForm/Status';


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
			// if (!training) {
			router.push('/trainings');
			// }
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

			<FormHeader	
				newLabel={`New Training`}
				editingLabel={`${training?.name}`}
				newRecord={!training}
			/>	
			
			<FormWrap onSubmit={handleSubmit}>

				<Input
					label="Event Name"
					value={trainingName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTrainingName(e.target.value)
					}
					placeholder="Training Name"
					disabled={disabledForm}
				/>

				<div className="flex-row flex justify-between">
					<Submit
						disabled={disabledForm}
						label="Training"
						newRecord={!training}
						isLoading={mutateTraining.isLoading}
					/>

					{training && (
						<Delete
							label="Delete Training"
							disabled={disabledForm}
							onClick={() => {
								delTraining.mutate();
							}}
						/>
					)}
				</div>				

				<Status
					isIdle={mutateTraining.isIdle}
					isLoading={mutateTraining.isLoading}
					isSuccess={mutateTraining.isSuccess}
				/>

				
			</FormWrap>
		</div>
	);
};

export default TrainingForm;
