import { graphQLRequest } from './request';

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folders($folderId: String!) {
                    folder(folderId: $folderId) {
                      id
                      name
                      notes {
                        id
                        content
                        updatedAt
                      }
                    }
                  }`;
  const folder = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });
  console.log('here',folder);
  return folder;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String!) {
    note(noteId: $noteId) {
      id
      content
    }
  }`;
  const note = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });
  console.log('Data is note', note);
  return note;
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObject = {};
  newNote.forEach((value, key) => (formDataObject[key] = value));
  console.log({ newNote, formDataObject });
  const query = `mutation Mutation($content: String!, $folderId: ID!){
    addNote(content: $content, folderId: $folderId){
      id
      content
    }
  }`;
  const { addNote } = await graphQLRequest({
    query,
    variables: formDataObject,
  });
  console.log({ addNote });
  return addNote;
};

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  const formDataObject = {};
  updatedNote.forEach((value, key) => (formDataObject[key] = value));
  console.log({ updatedNote, formDataObject });
  const query = `mutation Mutation($id: String!, $content: String!){
    updateNote(id: $id, content: $content){
      id
      content
    }
  }`;
  const { updateNote } = await graphQLRequest({
    query,
    variables: formDataObject,
  });
  return updateNote;
};
