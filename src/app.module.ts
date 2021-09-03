import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { CountriesModule } from './countries/countries.module';
import { LanguagesModule } from './languages/languages.module';
import { IndustriesModule } from './industries/industries.module';
import configuration from './config/configuration';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CompanyProfilesModule } from './company-profiles/company-profiles.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { roles } from './app.roles';
import { AccessControlModule } from 'nest-access-control';
import { ACAuthGuard } from './auth/guards/ac-auth.guard';

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
          };
        }
      },
      inject: [ConfigService],
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UsersModule,
    CoreModule,
    SharedModule,
    UserProfilesModule,
    CountriesModule,
    LanguagesModule,
    IndustriesModule,
    CompanyProfilesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
