'use client'
import FullMovieInformation from "@/components/FullMovieInformation";
import Loading from "@/components/Loading";
import MovieSearchCard from "@/components/MovieSearchCard";
import SearchBar from "@/components/SearchBar";
import { useMovies } from "@/hooks/useMovies";
import { IMovieSearch } from "@/intefaces/interface";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<string>("Lord of the rings");
  const { movies, setSelectedId, selectedId, isLoading, error } = useMovies(query)

  const handleSetMovieID = (id: string) => setSelectedId(id === selectedId ? null : id);
  const handleQuery = (id: string) => {
    setQuery(id);
  }



  return (
    <Container sx={{
      boxShadow: "0 0 20px 1px #111", padding: {
        sm: 0,
      }
    }}>
      <SearchBar updateQuery={handleQuery} query={query} />
      <Box minHeight="700px" sx={{ display: "flex",
        flexDirection: {
          lg: 'row',
          xs: 'column-reverse'
        }
       }}>
        <Paper elevation={0} sx={{ backgroundColor: "#222", color: "#fff", flex: 1 }} square variant="outlined">
          {isLoading && <Loading />}
          {!error && !isLoading && movies?.map((item: IMovieSearch, index) => <MovieSearchCard {...item} onSetMovieId={handleSetMovieID} key={index} />)}
        </Paper>
        <Paper elevation={0} variant="outlined" square sx={{
          flex: 1, backgroundColor: "var(--backgroundPrimary)", borderLeft: {xs:"none", lg: "1px solid var(--primary)"} , display: 'flex',
          justifyContent: 'center',
        }}>
          {selectedId ? <FullMovieInformation selectedID={selectedId}/> : <Typography marginTop={3} component="h3" variant="h3" alignSelf={'start'} color="var(--primary)">No movie selected</Typography>}
        </Paper>
      </Box>
    </Container>
  );
}
