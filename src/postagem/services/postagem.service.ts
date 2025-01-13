import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { Repository } from 'typeorm';

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
}
