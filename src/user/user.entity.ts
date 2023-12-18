import { Entity, Column } from 'typeorm';
@Entity()
class User {
  @Column()
  id: number;
  first_name: string;
  last_name: string;
}

export { User };
