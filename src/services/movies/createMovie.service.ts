import { Repository } from "typeorm";
import { TMovieRequest } from "../../interfaces/movies.interfaces";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";

const createMovieService = async (movieData: TMovieRequest): Promise<Movie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  return movie;
};

export default createMovieService;
