import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepostiory: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepostiory.find({
      relations: {
        postagem: true,
      },
    });
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepostiory.findOne({
      where: {
        id,
      },
      relations: {
        //relations serve para trazer as postagens relacionadas ao tema
        postagem: true,
      },
    });

    if (!usuario)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    return usuario;
  }
  //Método auxiliar para Validação do usuario
  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepostiory.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async createUsuario(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuário já existe', HttpStatus.BAD_REQUEST);

    //criptografando a senha
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepostiory.save(usuario);
  }

  async updateUsuario(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    //checa se o usuario e se o id é igual, pois se for igual ele permite alterar
    //se for diferente, já diz que foi cadastrado
    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'O Usuário (e-mail) já cadastrado',
        HttpStatus.BAD_REQUEST,
      );

    //criptografando a senha
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepostiory.save(usuario);
  }
}
