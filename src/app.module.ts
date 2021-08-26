import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const env = process.env.NODE_ENV;
        const conf = configService.get('db.mysql');
        if (env === 'production') {
          return {
            ...conf,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
          };
        } else {
          return {
            ...conf,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            logging: true,
            synchronize: true,
          };
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CoreModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
