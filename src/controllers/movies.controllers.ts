import { Request, Response } from "express";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import createMovieService from "../services/movies/createMovie.service";
import { movieSchema } from "../schemas/movies.schemas";
import getMoviesService from "../services/movies/getMovies.service";
import updateMovieService from "../services/movies/updateMovie.service";
import deleteMovieService from "../services/movies/deleteMovie.service";

const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(movieSchema.parse(newMovie));
};

const getMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const sort = req.query.sort;
  const order = req.query.order;
  const page = req.query.page;
  const perPage = req.query.perPage;

  const movies = await getMoviesService(sort, order, page, perPage);
  return res.json(movies);
};

const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = Number(req.params.id);
  const movieData: TMovieRequest = req.body;

  const newMovie = await updateMovieService(movieId, movieData);

  return res.json(newMovie);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = Number(req.params.id);
  await deleteMovieService(movieId);

  return res.status(204).send();
};

export {
  createMovieController,
  getMoviesController,
  updateMovieController,
  deleteMovieController,
};
