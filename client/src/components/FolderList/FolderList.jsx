import { Card, CardContent, List, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useState } from 'react';
function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: '#7d9d9c',
        height: '100%',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto',
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
            Folder
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{
              textDecoration: 'none',
            }}
            onClick={() => {
              setActiveFolderId(id);
            }}
          >
            <Card
              sx={{
                mb: '5px',
                backgroundColor:
                  id === activeFolderId ? 'rgb(255 211 140)' : null,
              }}
            >
              <CardContent
                sx={{ '&:last-child': { pd: '10px' }, padding: '10px' }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    paddingLeft: '5px',
                  }}
                >
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}

export default FolderList;
