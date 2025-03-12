import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Ai-Service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8000,
        },
      },
    ]),
  ],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
