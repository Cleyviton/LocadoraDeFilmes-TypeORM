import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string | null | undefined;

  @Column()
  duration: number;

  @Column()
  price: number;
}

export default Movie;
