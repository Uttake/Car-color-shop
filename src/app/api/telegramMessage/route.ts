import { CataloItemsType } from "@/app/utils/definitions";
import { NextResponse } from "next/server";


const token = process.env.TELEGRAM_TOKEN
const user = process.env.TELEGRAM_USER
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const items: CataloItemsType[] = body; 

        const availableItems = items.filter(item => item.avaiblity);
        const unavailableItems = items.filter(item => !item.avaiblity);

        const formatList = (title: string, items: CataloItemsType[]) => {
            const rows = items.map(item =>
                `• <b>${item.title}</b>\n  Цена: ${item.price} USD | Категория: ${item.category || 'Не указано'}`
            ).join('\n\n');
            return `<b>${title}</b>\n${rows || 'Нет товаров'}`;
        };
        
        const availableList = formatList("🔥 Товары в наличии", availableItems);
        const unavailableList = formatList("🚫 Товары отсутствуют", unavailableItems);
        
        const message = `${availableList}\n\n${unavailableList}`;
        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: user, text: message, parse_mode: 'HTML' }),
          });

          return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
        )
    } catch(e) {
        console.error("Ошибка при отправке сообщения:", e);
        return new NextResponse("Failed to send message.", { status: 500 });
    }
}