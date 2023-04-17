export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folders($folderId: String) {
                    folder(folderId: $folderId) {
                      id
                      name
                      notes {
                        content
                        id
                      }
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
      variables: {
        folderId,
      },
    }),
  });
  const {data} = await response.json();
  console.log('Data is folder', data);
  return data;
};

export const noteLoader = async ({ params: {noteId} }) => {
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      id
      content
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
      variables: {
        noteId
      },
    }),
  });
  const {data} = await response.json();
  console.log('Data is note', data);
  return data;
};
