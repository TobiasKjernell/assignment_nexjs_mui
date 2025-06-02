import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { IMovieSearch } from '@/intefaces/interface';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function MovieSearchCard({ imdbID, Title, Year, Poster, onSetMovieId }: IMovieSearch) {

  const theme = createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'outlined' },
                style: {
                  border: 'none',
                  borderBottom: '1px solid var(--primary)',
                },
              },
            ],
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>

      <Card variant='outlined' square sx={{ maxWidth: '100', backgroundColor: 'var(--backgroundPrimary)', color: 'var(--primary)' }}>
        <CardActionArea sx={{ display: "flex" }} onClick={() => onSetMovieId && onSetMovieId(imdbID)} >
          <CardMedia
            component="img"

            image={Poster}
            alt="green iguana"
            sx={{
              flex: '0 0 0',
              width: '100%',
              height: '150px',
              padding: '5px',

            }}
          />
          <CardContent sx={{ display: 'flex', flex: 1, color: 'var(--primary)', justifyContent: 'space-around', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{
              ":hover": {
                borderBottom: "1px solid var(--primary)"
              }
            }}>
              {Title}
            </Typography>
            <Typography variant="body2" px={1}>
              {Year}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
