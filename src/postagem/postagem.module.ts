import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemController } from './controllers/postagem.controller';
import { PostagemService } from './services/postagem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])], //importa o módulo TypeOrm configurado para a entidade Postagem
  controllers: [PostagemController], //define como serão as requisições
  providers: [PostagemService], // define como serão as ações dos dados
  exports: [TypeOrmModule], //exporta módulo que serão usados do typeorm 
})
export class PostagemModule {}
