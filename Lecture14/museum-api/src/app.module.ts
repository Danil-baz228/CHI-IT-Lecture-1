import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'root', 
      password: 'root', 
      database: 'museum', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    ExhibitsModule,
    AuthModule,
  ],
})
export class AppModule {}
