import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_postagens' }) //CREATE TABLE tb_postagens()
export class Postagem {
  @PrimaryGeneratedColumn() //define a id como chave primaria e auto increment
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  //remove os espaços em branco, antes e depois do texto
  //evita que o usuário insira espaços em branco
  @IsNotEmpty() //se ficar nulo volta um bad request
  @Column({ length: 100, nullable: false }) //VARCHAR(100) NOT NULL
  titulo: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  //remove os espaços em branco, antes e depois do texto
  //evita que o usuário insira espaços em branco
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) //VARCHAR(500) NOT
  texto: string;

  @UpdateDateColumn() //atualiza a data toda vez que for alterado
  data: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE', //// Deletar um tema também deleta todas as postagens relacionadas
    //o inverso nao acontece
  }) //muitas postagens para um tema
  tema: Tema;
  //tema é uma instancia da classe Tema
  //criado para fazer a relação entre as tabelas

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
