import { Repository } from "typeorm";
import { TMovie, TMovieRequest } from "../../interfaces/movies.interfaces";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";

const updateMovieService = async (
  movieId: number,
  movieData: TMovieRequest
): Promise<TMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovie: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  const newMovie: Movie = movieRepository.create({
    ...oldMovie,
    ...movieData,
  });

  await movieRepository.save(newMovie);

  return newMovie;
};

export default updateMovieService;
