import { BasketItemTypes } from "@/app/ui/components/basket/Basket";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, tel, email, order } = body;

 
        const transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: user,
                pass: pass,
            },
        });


        const cartItems = order
            .map((item: BasketItemTypes) => `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px; text-align: left;">${item.title}</td>
                    <td style="padding: 8px; text-align: center;">${item.count}</td>
                    <td style="padding: 8px; text-align: right;">${item.discount ? item.price - item.discount : item.price} BYN</td>
                </tr>
            `)
            .join("");


        const totalAmount = order.reduce(
            (total: number, item: BasketItemTypes) => total + (item.discount ? item.price - item.discount : item.price) * item.count,
            0
        );


        const message = `
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
                <h3 style="text-align: right; margin-top: 20px;">Итоговая цена: ${totalAmount} BYN</h3>
            </div>
        `;


        await transporter.sendMail({
            from: user,
            to: "kazimirovanton07@gmail.com",  
            subject: "Новый заказ",
            html: message,
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
