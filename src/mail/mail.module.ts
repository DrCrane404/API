// mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.srvice';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}