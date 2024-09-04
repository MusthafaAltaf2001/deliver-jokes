import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class jokes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    type: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}


@Entity()
export class jokes_type {
    @PrimaryGeneratedColumn()
    joke_type_id: number;

    @Column()
    joke_type_text: string;
}