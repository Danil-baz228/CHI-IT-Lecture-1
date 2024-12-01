import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Expose } from 'class-transformer';

@Entity('exhibits')
export class Exhibit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  userId: number;
  @Column({ nullable: true })
  imagePath: string;
  @ManyToOne(() => User, (user) => user.exhibits, { eager: true }) 
  @JoinColumn({ name: 'userId' }) 
  @Expose()
  user: User;
}
