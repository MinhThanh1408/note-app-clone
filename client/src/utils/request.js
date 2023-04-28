import { GRAPHQL_SERVER } from './constants';

export const graphQLRequest = async (payload, options = {}) => {
  if (localStorage.getItem('accessToken')) {
    const response = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ...options,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 403) {
        return null;
      }
    }
    const { data } = await response.json();
    console.log({ data });
    return data;
  }
  return null;
};
