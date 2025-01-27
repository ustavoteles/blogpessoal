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
import { TemaService } from '../services/tema.service';
import { Tema } from '../entities/tema.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller('/temas') //decorator que define a classe como um controller (recebe requisições http)
@ApiBearerAuth()
// define o path(caminho) base para as rotas
export class TemaController {
  constructor(private readonly temaService: TemaService) {}
  //nessa linha é criado um construtor que recebe uma instância do serviço TemaService
  //e a atribui a uma variável privada chamada temaService
  // o readonly apenas define que a variável não pode ser alterada

  //Apenas requisições do tipo post e put conseguem enviar dados no corpo da requisição
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tema[]> {
    //Promise<Tema[]> = promessa de um array de objetos do tipo Tema
    return this.temaService.findAll(); //retorna o resultado do método findAll do serviço
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByDesc(@Param('descricao') descricao: string): Promise<Tema[]> {
    //@param = decorator que define que o parâmetro é um parâmetro de rota
    return this.temaService.findByDesc(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTema(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.createTema(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateTema(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.updateTema(tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTema(@Param('id', ParseIntPipe) id: number) {
    return this.temaService.deleteTema(id);
  }
}
