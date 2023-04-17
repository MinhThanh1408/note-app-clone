export const foldersLoader = async () => {
  const query = `query Folder {
      folders {
        id
        name
      }
    }`;
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });
  const { data } = await response.json();
  console.log('Data is folders', data);
  return data;
};
