import axios from 'axios';

export const getFacilitators = () =>
	axios.get('/api/facilitators').then(({ data }) => data);
