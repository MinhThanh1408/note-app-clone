import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
import {GraphQLScalarType} from 'graphql';

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value){
      return new Date(value);
    },
    serialize(value){
      return value.toISOString();
    }

  }),
  Query: {
    folders: async (parent, argruments, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ folders, context });
      return folders;
    },

    folder: async (parent, argruments) => {
      const folderId = argruments.folderId;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: async (parent, argruments) => {
      const noteId = argruments.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  Folder: {
    notes: async (parent, argruments) => {
      const folderId = parent.id;
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: 'desc',
      });
      console.log({ notes });
      return notes;
    },
    author: async (parent, argruments) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
  },
  Mutation: {
    addFolder: async (parent, argruments, context) => {
      const newFolder = new FolderModel({
        ...argruments,
        authorId: context.uid,
      });
      await newFolder.save();
      return newFolder;
    },
    updateNote: async (parent, argruments) => {
      const noteId = argruments.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, argruments);
      return note;
    },
    addNote: async (parent, argruments, context) => {
      const newNote = await NoteModel(argruments);
      await newNote.save();
      return newNote;
    },
    register: async (parent, argruments) => {
      const foundUser = await AuthorModel.findOne({ uid: argruments.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(argruments);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
