import { Grid, List, Card, CardContent, Typography } from '@mui/material';
import { Link, useParams, useLoaderData } from 'react-router-dom';
import { Box } from '@mui/system';
import Note from '../Note';
import { useState } from 'react';
function NoteList() {
  const { noteId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData();
  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={4}
        sx={{
          height: '100%',
          width: '100%',
          maxWidth: 360,
          overflowy: 'auto',
          bgcolor: '#f0ebe3',
          padding: '10px',
          paddingLeft: '30px',
          textAlign: 'left',
        }}
      >
        <List
          subheader={
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Notes</Typography>
            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => {
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
                    sx={{ '&:lastchild': { pd: '10px' }, padding: '10px' }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: 'bold' }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || 'Empty'}`,
                      }}
                    ></div>
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
