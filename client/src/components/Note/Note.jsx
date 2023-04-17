import { useEffect, useState } from 'react';
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { draftToHtml } from 'draftjs-to-html';
import {  useLoaderData } from 'react-router-dom';

function Note() {
  const data = useLoaderData();
  const note={
    id:"1",
    content: 'hi',
  }
  console.log(data);

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(note.content);

  const handleOnChange = (event) => {
    setEditorState(event);
    setRawHTML(draftToHtml(convertToRaw(event.getCurrentContent())));
  };

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder='Write something'
    />
  );
}

export default Note;
