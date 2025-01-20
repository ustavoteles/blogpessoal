import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tema } from '../entities/tema.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable() //decorator que define a classe como um provedor de serviços
export class TemaService {
  //service que será responsável por implementar a lógica de funcionamento do módulo

  //constructor = um método especial que é executado quando uma instância da classe é criada

  constructor(
    @InjectRepository(Tema) //injeta o repositório, que será utilizado para realizar operações no banco de dados
    private temaRepository: Repository<Tema>, //define o repositório da entidade Tema
  ) {} // {} = corpo do construtor

  //select * from tb_temas
  async findAll(): Promise<Tema[]> {
    //Tema[] = array de objetos do tipo Tema
    return await this.temaRepository.find({
      relations: {
        postagem: true, //retorna as postagens relacionadas ao tema
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: {
        id,
      },
      relations: {
        //relations serve para trazer as postagens relacionadas ao tema
        postagem: true,
      },
    });

    if (!tema)
      throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);

    return tema;
  }

  async findByDesc(descricao: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagem: true,
      },
    });
  }

  async createTema(tema: Tema): Promise<Tema> {
    //Promise<Tema> = promessa de um objeto do tipo Tema
    return await this.temaRepository.save(tema); //
  }

  async updateTema(tema: Tema): Promise<Tema> {
    await this.findById(tema.id);
    //findbyid ja retorna um erro caso não encontre, entao se torna uma verificaçao redundante
    return await this.temaRepository.save(tema); //salva o tema no banco de dados
    //com o await, a execução do código é pausada até que a promessa seja resolvida
  }

  async deleteTema(id: number): Promise<DeleteResult> {
    let buscaTema = await this.findById(id);

    if (!buscaTema)
      throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND);

    return await this.temaRepository.delete(id);
  }
}
