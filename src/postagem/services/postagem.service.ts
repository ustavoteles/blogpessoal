import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
//esse decorador é necessário para que a classe
// possa ser injetada em outras classes
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    //o injectRepository é um decorador
    // que injeta o repositório (Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find(); //SELECT * FROM postagem
  }

  //SELECT * FROM postagem WHERE id = ?;
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });
    //await espera que o findOne traga um resultado, mas nao trava a aplicação

    if (!postagem) throw new HttpException('Postagem nao encontrada', 404);

    return postagem;
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`), //like esta igual no mysql, o i é insensitive
      },
    }); //SELECT * FROM postagem
  }

  async create(postagem: Postagem): Promise<Postagem> {
    //INSERT INTO postagem (titulo, conteudo) VALUES (?, ?);
    return await this.postagemRepository.save(postagem);
  } //salva a entidade postagem no banco de dados e torna com atualizações

  async update(postagem: Postagem): Promise<Postagem> {
    //o findbyid ja retorna um erro caso não encontre
    //entao nao é necessario essa validação novamente
    await this.findById(postagem.id);

    // UPDATE tb_postagens SET titulo = postagem.titulo, texto = postagem.texto,
    //  data = CURRENT_TIMESTAMP() WHERE id = ?;
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    //o delete result é um objeto que retorna o numero de linhas afetadas

    await this.findById(id);
    //verifica se a postagem existe

    //DELETE FROM tb_postagens WHERE id = ?;
    return await this.postagemRepository.delete(id);
  }
}
