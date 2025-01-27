import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from '../transports/nats/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    // ClientsModule.register([
    //   // INTEGRACION POR TCP
    //   {
    //     name: PRODUCT_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       host: envs.productsMicroservicesHost,
    //       port: envs.productsMicroservicesPort,
    //     },
    //   },
    // ]),
    NatsModule,
  ],
})
export class ProductsModule {}
