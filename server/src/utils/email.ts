import { User } from "@prisma/client";

import nodemailer from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
const mailjetTransport = require("nodemailer-mailjet-transport");

export class Email {
  private to: string;
  private from: string;
  private url: string;
  private username: string;
  constructor(user: User, url: string) {
    this.to = user.email;
    this.username = user.username || user.email.split("@")[0];
    this.url = url;
    this.from = `EmirYscn <${process.env.AUTHOR_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
        throw new Error("Mailjet credentials are missing in production.");
      }
      // Mailjet
      //   return nodemailer.createTransport(
      //     mailjetTransport({
      //       auth: {
      //         apiKey: process.env.MAILJET_API_KEY,
      //         apiSecret: process.env.MAILJET_API_SECRET,
      //       },
      //     })
      //   );
      return nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_API_SECRET,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template: string, subject: string) {
    try {
      // 1) Render HTML based on a pug template
      const html = pug.renderFile(
        `${__dirname}/../views/email/${template}.pug`,
        {
          username: this.username,
          url: this.url,
          subject,
        }
      );

      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html),
      };

      // 3) Create a transport and send email
      console.log("Sending email...");
      await this.newTransport().sendMail(mailOptions);
      console.log("Email sent");
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email. Please try again later.");
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Backend Weekly!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 1 hour)"
    );
  }
}
