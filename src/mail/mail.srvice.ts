import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export class MailService {

    constructor (private configService:ConfigService){}

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
        }
    });

    async sendPasswordReset(email: string, code: string) {

        await this.transporter.sendMail({
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
            <h2>Recuperación de contraseña</h2>
            <p>Haz clic en el siguiente enlace:</p>
            <h1>${code}</h1>
            <p>Este codigo expira en 10 minutos</p>
        `
        });
    }
    }