import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive().int(),
  price: z.number().int(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const moviesSchema = z.array(movieSchema);

const updateMovieSchemaRequest = movieSchemaRequest.partial();

export {
  movieSchema,
  movieSchemaRequest,
  moviesSchema,
  updateMovieSchemaRequest,
};
