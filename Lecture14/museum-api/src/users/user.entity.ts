import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exhibit } from 'src/exhibits/exhibit.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({ type: () => [Exhibit], description: 'Список экспонатов, добавленных пользователем' })
  exhibits: Exhibit[];
}
