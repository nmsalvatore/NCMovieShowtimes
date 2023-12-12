import nodemailer from 'nodemailer'
import logger from '../utils/logger.js'
import 'dotenv/config'

function sendEmail(subject, body) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.VERIFIED_SENDER,
            to: process.env.VERIFIED_RECIPIENT,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw error
            }
            
            logger.info('Email sent: ' + info.response)
        }) 
    });
}

export const notify = { sendEmail }
