import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import { AppError } from "../error";

const verifyNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const newMovie: TMovieRequest = req.body;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const existsMovie = await movieRepository.exist({
    where: { name: newMovie.name },
  });

  if (req.body.name && existsMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default verifyNameExists;
