import { IMovieSearch } from "@/intefaces/interface";
import { useEffect, useState } from "react";

const KEY = '958330a6'; //TMP FOR ASSIGNMENT

export function useMovies(query: string) {
    const [selectedId, setSelectedId] = useState<null | string>(null);
    const [movies, setMovies] = useState<IMovieSearch[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        async function apiCall() {
            try {
                setIsLoading(true);
                setError("");
                let fetchCall: Response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
                if (!fetchCall.ok) throw new Error('Something went wrong with fetching movies')
                let result = await fetchCall.json();
                if (result.Response === "False") throw new Error(result.Error);

                setMovies(result.Search);
                setError("");
            } catch (e: any) {
                if (e.name !== 'AbortError') setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        setSelectedId(null);
        apiCall();

        return function () {
            controller.abort();
        }
    }, [query]
    )
    return { movies, setSelectedId, selectedId, isLoading, error }
}