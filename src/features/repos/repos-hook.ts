import { useRef, useState, useEffect } from 'react';
import { Repo, useLazyGetReposQuery } from 'src/app/api/repos.service';
import { PageInfo } from 'src/app/api/types.generated';

export function useInfiniteSearchReposQuery({ login }: { login: string }) {
	const shouldReset = useRef(true);
	const [results, setResults] = useState<Repo[]>([]);
	const [trigger, result] = useLazyGetReposQuery();

	useEffect(() => {
		trigger({ login, first: 20 });
	}, []);

	useEffect(() => {
		shouldReset.current = true;
		trigger({ login, first: 20 });
	}, [login]);

	useEffect(() => {
		if (!result.isSuccess) return;
		if (shouldReset.current) {
			shouldReset.current = false;
			if (result?.data?.repos) setResults(result?.data?.repos);
		} else {
			setResults([...results, ...(result?.data?.repos || [])]);
		}
	}, [result.data]);

	function fetchNextPage() {
		if (result?.data?.pageInfo?.hasNextPage) {
			trigger({
				login,
				first: 20,
				after: result.data.pageInfo.endCursor,
			});
		}
	}

	return {
		...result,
		data: {
			repos: results,
			pageInfo: result.data?.pageInfo,
		},
		fetchNextPage,
	};
}
