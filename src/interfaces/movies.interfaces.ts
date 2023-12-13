import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  moviesSchema,
} from "../schemas/movies.schemas";

type TMovie = z.infer<typeof movieSchema>;

type TMovieRequest = z.infer<typeof movieSchemaRequest>;

type TMovies = z.infer<typeof moviesSchema>;

type TMoviesPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMovies;
};

export { TMovie, TMovieRequest, TMovies, TMoviesPagination };
