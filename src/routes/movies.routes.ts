import { Router } from "express";
import ensureValuesData from "../middlewares/ensureValuesData.middlewares";
import {
  movieSchemaRequest,
  updateMovieSchemaRequest,
} from "../schemas/movies.schemas";
import verifyNameExists from "../middlewares/verifyNameExists.middleware";
import {
  createMovieController,
  deleteMovieController,
  getMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import verifyIdExists from "../middlewares/verifyIdExists.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureValuesData(movieSchemaRequest),
  verifyNameExists,
  createMovieController
);

moviesRoutes.get("", getMoviesController);

moviesRoutes.patch(
  "/:id",
  verifyIdExists,
  ensureValuesData(updateMovieSchemaRequest),
  verifyNameExists,
  updateMovieController
);

moviesRoutes.delete("/:id", verifyIdExists, deleteMovieController);

export default moviesRoutes;
