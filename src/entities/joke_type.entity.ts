import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class joke_type {
    @PrimaryGeneratedColumn()
    joke_type_id: number;

    @Column()
    joke_type_name: string;
}