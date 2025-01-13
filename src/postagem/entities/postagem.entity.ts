import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_postagens' }) //CREATE TABLE tb_postagens()
export class Postagem {
  @PrimaryGeneratedColumn() //define a id como chave primaria e auto increment
  id: number;

  @IsNotEmpty() //se ficar nulo volta um bad request
  @Column({ length: 100, nullable: false }) //VARCHAR(100) NOT NULL
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) //VARCHAR(500) NOT
  texto: string;

  @UpdateDateColumn() //atualiza a data toda vez que for alterado
  data: Date;
}
