import { useEffect, useState, useMemo } from 'react';
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useRouteLoaderData, useSubmit, useLocation } from 'react-router-dom';
import { debounce } from '@mui/material';

function Note() {
  const submit = useSubmit();
  const location = useLocation();
  const noteEmpty = {
    id: '0',
    content: '',
  };
  const { note } = useRouteLoaderData('note') ?? { note: noteEmpty };

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

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;
      submit(
        { ...note, content: rawHTML },
        {
          method: 'post',
          action: pathname,
        }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder='Write something'
    />
  );
}

export default Note;
