import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 500, nullable: false })
  descricao: string;

  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  // Na arrow function:
  // O primeiro parâmetro é a classe relacionada
  // O segundo parâmetro é a variável que representa a relação
  // postagem.tema é uma instância da classe Tema
  postagem: Postagem[];

  //one to many = um tema para muitas postagens
  //nessa construção é criado um array de postagen
  // para cada tema e assim é feita a relação entre as tabelas
}
