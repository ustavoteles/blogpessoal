import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id') //o 2 pontos ( :) indica que é um parametro e esta voltando como string
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/titulo/:titulo') // diferenciando a rota para buscar por titulo, o primeiro titulo é o caminho e o outro é uma variavel
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(titulo);
  }

  @Post() //pega o corpo da requisição e cria uma postagem
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem); // Chama o serviço para criar uma nova postagem e retorna a postagem criada
  }

  @UseGuards(JwtAuthGuard)
  @Put() //atualiza a postagem com base no id
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  /* @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.postagemService.delete(id);
    return { message: 'Postagem deletada com sucesso' };
  }
  
  @Delete('/:id') //deleta a postagem com base no id
  @HttpCode(HttpStatus.NO_CONTENT) //retorna um status 204 e não retorna nada
  // (no_content é o status de sucesso)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
    //chama o serviço para deletar a postagem e retorna o resultado
  }*/
}
