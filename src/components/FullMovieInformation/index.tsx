'use client'
import { IFullMovieData, ISelectedId } from "@/intefaces/interface";
import { StarOutline } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FullMovieInformation = ({ selectedID }: ISelectedId) => {
    const [movieId, setMovieId] = useState<IFullMovieData | null>(null);

    useEffect(() => {
        async function getMovieDetails() {
            let fetchCall = await fetch(`http://www.omdbapi.com/?apikey=958330a6&i=${selectedID}`);
            let result = await fetchCall.json();

            const movieData: IFullMovieData = {
                title: result.Title,
                year: result.Year,
                poster: result.Poster,
                imdbRating: Number(result.imdbRating),
                runtime: result.Runtime,
                plot: result.Plot,
                released: result.Released,
                language: result.Language,
                actors: result.Actors,
                director: result.Director
            }
            setMovieId(movieData);
        }
        getMovieDetails();
    }, [selectedID])

    return (
        <Card sx={{ backgroundColor: "transparent", color: 'var(--primary)', borderBottom: '1px solid var(--primary)' }} elevation={0} square>
            <Box
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                margin={1.5}
                border={"1px solid var(--primary)"
                }>
                <Typography component="h4" variant="h4" p={2} sx={{fontSize: {xs: 24, lg: 36}}}>{movieId?.title} </Typography>
                <Typography component="h6" variant="h6" px={2}>{movieId?.year}</Typography>
            </Box>
            <Box sx={{ display: 'flex', padding: 2, flexDirection:{xs: 'column', lg: 'row'}}}>
                <CardMedia component='img' height="100%" width={"auto"} image={movieId?.poster}  sx={{height: {sm: "10%"}, width:{sm:"50%"}, alignSelf:'center'}}/>
                <CardContent>
                    <Typography component={"p"} variant="body1" marginBottom={1}>{movieId?.runtime}</Typography>
                    <Typography component={"p"} variant="body2">{movieId?.plot}</Typography>
                    <Typography component={"p"} variant="body2" mt={1}>Realeased in {movieId?.released}</Typography>
                    <Typography component={"p"} variant="body2">{movieId?.language}</Typography>
                    <Typography component={"p"} variant="body2" mt={1}>Directed by: {movieId?.director}</Typography>
                    <Typography component={"p"} variant="body2" mt={1}>Starring: {movieId?.actors}</Typography>

                    <Rating value={movieId?.imdbRating ? Number(movieId.imdbRating) : 0} precision={0.5} defaultValue={0} max={10} readOnly sx={{ marginTop: 2, color: 'var(--primary)' }} emptyIcon={<StarOutline style={{ opacity: 1, color: "var(--secondary)" }} fontSize="inherit" />} />
                </CardContent>
            </Box>
        </Card>
    )
}

export default FullMovieInformation;