import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { IEmailConfig } from './interface/IEmailConfig';

@Module({
  providers: [
    {
      provide: MailService,
      useFactory: (configService: ConfigService) => {
        const service = new MailService();
        const emailConfig: IEmailConfig = configService.get('email');
        service.setApiKey(emailConfig.apiKey);

        return service;
      },
      inject: [ConfigService],
    },
  ],
})
export class EmailModule { }
