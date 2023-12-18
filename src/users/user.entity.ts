import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
  @Column()
  authStrategy: string;
}

export { User };
