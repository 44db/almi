import { useEffect, useState } from 'react';

interface UseClientServiceProps<T> {
	fetchData: () => Promise<T>;
}

interface UseClientServiceResult<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
}

const UseClientService = <T>({
	fetchData,
}: UseClientServiceProps<T>): UseClientServiceResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchDataAndSetState = async (): Promise<void> => {
			setIsLoading(true);
			try {
				const result: T = await fetchData();
				setData(result);
			} catch (error: any) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDataAndSetState();
	}, [fetchData]);

	return { data, isLoading, error };
};

export default UseClientService;
