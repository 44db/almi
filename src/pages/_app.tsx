import React from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '@/components/Layout/Layout';

import { isAxiosError } from 'axios';
const MAX_RETRIES = 6;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

const qcOptions = {
	defaultOptions: {
		queries: {
			retry: (failureCount: number, error: any) => {
				if (failureCount > MAX_RETRIES) {
					return false;
				}

				if (
					isAxiosError(error) &&
					HTTP_STATUS_TO_NOT_RETRY.includes(
						error.response?.status ?? 0
					)
				) {
					console.log(
						`Aborting retry due to ${error.response?.status} status`
					);
					return false;
				}
				return true;
			},
		},
	},
};

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient(qcOptions));

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
