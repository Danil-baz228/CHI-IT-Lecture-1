import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string; 

    @Column()
    user!: string; 

    @Column()
    email!: string; 
}
