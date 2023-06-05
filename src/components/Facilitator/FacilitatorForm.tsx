import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Facilitator } from '@/appTypes/facilitator';

import { putFacilitator, postFacilitator, deleteFacilitator } from '@/queries/facilitator.query';

import FormHeader from '@/components/UIForm/FormHeader';
import Input from '@/components/UIForm/Input';
import FormWrap from '@/components/UIForm/FormWrap';
import Submit from '@/components/UIForm/Submit';
import Delete from '@/components/UIForm/Delete';
import Status from '@/components/UIForm/Status';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	facilitator?: Facilitator;
}

const FacilitatorForm: React.FC<Props> = ({ facilitator, ...props }) => {
	const router = useRouter();

	// Form State
	// **********	
	const [ facilitatorName, setFacilitatorName ] = useState<string>('');
	const [ disabledForm, setDisabledForm ] = useState<boolean>(false);

	useEffect(() => {
		if (!facilitator) return;
		setFacilitatorName(facilitator.name);
		
	}, [ facilitator ]);


	// Mutations
	// *********
	const mutateFacilitator = useMutation({
		// PUT or POST depending on whether we have an employee or not
		mutationFn: (newFacilitator: any) => {
			return facilitator
				? putFacilitator(facilitator.id ?? 0, newFacilitator)
				: postFacilitator(newFacilitator);
		},
		mutationKey: facilitator ? ['putTraining', facilitator.id] : ['postTraining'],
		onMutate: async () => {
			if (!facilitator) {
				router.push('/facilitators');
			}
		},
		onError: (error) => {
			console.error('Mutation error', error);
		},
	});

	const delFacilitator = useMutation({
		mutationFn: () => deleteFacilitator(facilitator?.id ?? 0),
		mutationKey: ['deleteFacilitator', facilitator?.id],
		onMutate: async () => {		
			router.push('/facilitators');
		},
		onError: (error: any) => {
			console.error('Delete Facilitators Error', error);
		},
	});

	useEffect(() => {
		if (delFacilitator.isLoading || mutateFacilitator.isLoading)
			setDisabledForm(true);
		else setDisabledForm(false);
	}, [ delFacilitator, mutateFacilitator ]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const payload = {
				name: facilitatorName,				
			};

			mutateFacilitator.mutate(payload);
		},
		[ facilitatorName, mutateFacilitator ]
	);

	return (
		<div className="w-full max-w-2xl flex-col m-auto" {...props}>

			<FormHeader	
				newLabel={`New Facilitator`}
				editingLabel={`${facilitator?.name}`}
				newRecord={!facilitator}
			/>		

			<FormWrap onSubmit={handleSubmit}>
			
				<Input
					label="Facilitator Name"
					value={facilitatorName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFacilitatorName(e.target.value)
					}
					placeholder="Facilitator Name"
					disabled={disabledForm}
				/>
				

				<div className="flex-row flex justify-between">
					<Submit
						disabled={disabledForm}
						label="Facilitator"
						newRecord={!facilitator}
						isLoading={mutateFacilitator.isLoading}
					/>

					{facilitator && (
						<Delete
							label="Delete Facilitator"
							disabled={disabledForm}
							onClick={() => {
								delFacilitator.mutate();
							}}
						/>
					)}
				</div>

				<Status
					isIdle={mutateFacilitator.isIdle}
					isLoading={mutateFacilitator.isLoading}
					isSuccess={mutateFacilitator.isSuccess}
				/>

			</FormWrap>

		</div>
	);
};

export default FacilitatorForm;
