import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import SubHeader from '@/components/Header/SubHeader';

interface GenericListProps<T> {
	queryKey: string[];
	queryFn: () => Promise<T[]>;
	formatData?: (data: T) => React.JSX.Element;
	formatHeader?: () => React.JSX.Element;
	title: string;
	newLink: string;
	newLinkTitle: string;
	editLinkBase: string;
}

const GenericList: React.FC<GenericListProps<any>> = ({
	queryKey,
	queryFn,
	formatData,
	formatHeader,
	title,
	newLink,
	newLinkTitle,
	editLinkBase,
	...props
}) => {
	
	const router = useRouter();

	const {
		isLoading,
		isError,
		isSuccess,
		data: items,
	} = useQuery({
		queryKey,
		queryFn,
	});

	const editItem = useCallback(
		(e: React.SyntheticEvent<HTMLDivElement>) => {
			const id = e.currentTarget.dataset.id;
			router.push(`${editLinkBase}/${id}`);
		},
		[router, editLinkBase]
	);

	if (isError) return <div>There has been an error</div>;
	if (isLoading) return <div>Loading...</div>;

	if (isSuccess)
		return (
			<div {...props}>
				<SubHeader
					title={title}
					link={newLink}
					linkTitle={newLinkTitle}
				/>
				<div className="flex flex-row border-b-2 border-orange-500 py-2 px-2">
					{/* Header */}
					{formatHeader && formatHeader()}
				</div>
				{/* Body */}
				{items.map((item, index) => (
					<div
						key={index}
						className="flex flex-row border-b-2 border-indigo-500 py-4 px-2 cursor-pointer hover:bg-slate-50"
						data-id={item.id}
						onClick={editItem}
					>
						{formatData && formatData(item)}
					</div>
				))}
			</div>
		);
	
	return null;
};

export default GenericList;
