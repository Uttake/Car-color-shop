import { BasketItemTypes } from "@/app/ui/components/basket/Basket";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getUsd } from "@/app/utils";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, tel, email, services, message, order, callback } = body;
        const course = await getUsd()
        let newMessage;
 
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: user,
                pass: pass,
            },
        });


        const cartItems = order && order
            .map((item: BasketItemTypes) => `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px; text-align: left;">${item.title}</td>
                    <td style="padding: 8px; text-align: center;">${item.count}</td>
                    <td style="padding: 8px; text-align: right;">${item.discount ? item.price * course - item.discount : item.price * course} BYN</td>
                </tr>
            `)
            .join("");


        const totalAmount = order && order.reduce(
            (total: number, item: BasketItemTypes) => total + (item.discount ? item.price - item.discount : item.price) * item.count,
            0
        );

        if(order) {
            newMessage = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">Новый заказ</h2>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Телефон:</strong> ${tel}</p>
                ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
                <h3>Детали заказа:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="padding: 8px; text-align: left;">Товар</th>
                            <th style="padding: 8px; text-align: center;">Количество</th>
                            <th style="padding: 8px; text-align: right;">Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartItems}
                    </tbody>
                </table>
                <h3 style="text-align: right; margin-top: 20px;">Итоговая цена: ${(totalAmount * course).toFixed(2)} BYN</h3>
            </div>
        `;
        }


        if(callback) {
            newMessage = `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50; text-align: center;">Новая заявка на обратную связь</h2>
            <p style="font-size: 16px; margin-bottom: 20px; text-align: center;">
              Получена новая заявка от клиента. Проверьте данные и свяжитесь с ним.
            </p>
          
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Имя:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Телефон:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${tel}</td>
              </tr>
              ${email ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">E-mail:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
              </tr>
              ` : ""}
              ${services ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Интересующий товар / услуга:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${services}</td>
              </tr>
              ` : ""}
              ${message ? `
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;">Сообщение:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
              </tr>
              ` : ""}
            </table>
          
          </div>`
        }
        await transporter.sendMail({
            from: user,
            to: "kazimirovanton07@gmail.com",  
            subject: order ? "Новый заказ" : "Новая заявка на обратную связь",
            html: newMessage,
        });

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        return new NextResponse("Failed to send message.", { status: 500 });
    }
}
