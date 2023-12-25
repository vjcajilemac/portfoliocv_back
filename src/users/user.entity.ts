import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;
  @Column()
  authStrategy: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
  @Column({ default: 'user' })
  role: string;

  @DeleteDateColumn()
  deletedAt: Date;
}

export { User };
