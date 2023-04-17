import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import fakeData from './fakeData.js';

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note],
  }

  type Note {
    id: String,
    content: String,
  }

  type Author {
    id: String,
    name: String,
  }

  type Query {
    folders: [Folder],
    folder(folderId: String): Folder,
    authors: [Author],
    note(noteId: String): Note,
  }
`;
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },

    folder: (parent, argruments) => {
      const folderId = argruments.folderId;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
    authors: () => {
      return fakeData.authors;
    },
    note: (parent, argruments)=>{
      const noteId = argruments.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    }
  },
  Folder: {
    notes: (parent, argruments) => {
      const folderId = parent.id;
      return fakeData.notes.filter((note) => note.folderId === folderId);
    },
    author: (parent, argruments) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve, reject) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log('Server ready at http://localhost:4000');
