import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PedidosController } from './pedidos/pedidos.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PedidosController],
  providers: [AppService],
})
export class AppModule {}
