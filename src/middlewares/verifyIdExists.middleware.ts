import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId: number = Number(req.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const existsMovie = await movieRepository.exist({
    where: { id: movieId },
  });

  if (!existsMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export default verifyIdExists;
