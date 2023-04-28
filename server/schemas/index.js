export const typeDefs = `#graphql
  scalar Date

  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note],
  }

  type Note {
    id: String!,
    content: String,
    updatedAt: Date,
  }

  type Author {
    uid: String!,
    name: String!,
  }

  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder,
    authors: [Author],
    note(noteId: String!): Note,
  }
  type Mutation {
    addFolder(name: String!): Folder,
    updateNote(id: String!, content: String!): Note,
    addNote(content: String!, folderId: ID!): Note,
    register(uid: String!, name: String!): Author
  }
`;
