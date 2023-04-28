import {
  Grid,
  List,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Link,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from 'react-router-dom';
import { Box } from '@mui/system';
import Note from '../Note';
import { useEffect, useState } from 'react';
import { NoteAddOutlined } from '@mui/icons-material';
import moment from 'moment';
import classnames from 'classnames/bind';

import styles from './NoteList.module.scss';
const cx = classnames.bind(styles);

function NoteList() {
  const navigate = useNavigate();
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const submit = useSubmit();
  const { folder } = useLoaderData();

  const handleAddNewNote = () => {
    submit(
      {
        content: '',
        folderId,
      },
      {
        method: 'post',
        action: `folders/${folderId}`,
      }
    );
  };
  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    if (folder.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes]);

  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={4}
        sx={{
          height: '100%',
          width: '100%',
          maxWidth: 360,
          overflow: 'auto',
          bgcolor: '#f0ebe3',
          padding: '10px',
          textAlign: 'left',
        }}
      >
        <List
          subheader={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
              <Tooltip title='Add Note' onClick={handleAddNewNote}>
                <IconButton size='small'>
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder.notes.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: 'none' }}
                onClick={() => {
                  setActiveNoteId(id);
                }}
              >
                <Card
                  sx={{
                    mb: '5px',
                    backgroundColor:
                      id === activeNoteId ? 'rgb(255 211 140)' : null,
                  }}
                >
                  <CardContent
                    className={cx('card-title')}
                    sx={{
                      '&:lastchild': { pd: '10px' },
                      padding: '10px',
                    }}
                  >
                    <div
                      className={cx('card-content')}
                      style={{ fontSize: 14, fontWeight: 'bold' }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || 'Empty'}`,
                      }}
                    />
                    <Typography sx={{ fontSize: '10px' }}>
                      {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')} 
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Note />
      </Grid>
    </Grid>
  );
}

export default NoteList;
