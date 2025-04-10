import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryColumn()
  id_user: number;

  @PrimaryColumn()
  id_movie: number;

  @Column({ type: 'timestamp' })
  dateDebut: Date;

  @Column({ type: 'timestamp' })
  dateFin: Date;
}
