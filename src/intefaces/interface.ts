export interface IMovieSearch {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
    runtime?: number,
    imdbRating?: number,
    onSetMovieId?: (s: string) => void;
}

export interface ISelectedId {
    selectedID: string
}

export interface IFullMovieData {
    title: string
    year: string
    poster: string
    imdbRating: Number,
    runtime: string,
    plot: string,
    released: string,
    language: string,
    actors: string,
    director: string
}