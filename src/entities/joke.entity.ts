import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class joke {
    @PrimaryGeneratedColumn()
    joke_id: number;

    @Column()
    joke_content: string;

    @Column()
    joke_type_id: number;
}


