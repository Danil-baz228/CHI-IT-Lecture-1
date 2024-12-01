import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from 'src/users/user.entity';
  import { Exhibit } from 'src/exhibits/exhibit.entity';
  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @Column()
    userId: number;
  
    @Column()
    exhibitId: number;
  
    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Exhibit, (exhibit) => exhibit.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exhibitId' })
    exhibit: Exhibit;



    
  }
  