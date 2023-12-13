import { Repository } from "typeorm";
import { TMovies, TMoviesPagination } from "../../interfaces/movies.interfaces";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";

const getMoviesService = async (
  sort: any,
  order: any,
  page: any,
  perPage: any
): Promise<TMoviesPagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const AllMovies = await movieRepository.find();
  const moviesCount = AllMovies.length;
  let prevPage: string | null;
  let nextPage: string | null;

  sort = sort?.toString();
  order = order?.toString();
  page = Number(page) || 1;
  perPage = Number(perPage) || 5;

  if (sort !== "price" && sort !== "duration") {
    sort = "id";
    order = "ASC";
  }

  if (order != "desc") {
    order = "asc";
  }

  if (page < 1) {
    page = 1;
  }
  if (perPage < 1 || perPage > 5) {
    perPage = 5;
  }

  const MoviesData: Movie[] = await movieRepository.find({
    skip: (page - 1) * perPage,
    take: perPage,
    order: {
      [sort]: order,
    },
  });

  if (page - 1 >= 1) {
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  } else {
    prevPage = null;
  }

  if (moviesCount > perPage * page) {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  } else {
    nextPage = null;
  }

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: moviesCount,
    data: MoviesData,
  };
};

export default getMoviesService;
