
import DOMPurify from "dompurify";
export const fixStyleString = (htmlString: string): string => {
    return htmlString
      .replace(/\\&quot;/g, '"')
      .replace(/\\"/g, '"')
      .replace(/^"|"$/g, "")
      .trim();
  };


  export function sanitizeHtml(html: string) {
    return DOMPurify.sanitize(html);
  }

export const description : Record<string, string> = {
  'emali': 'Эмали',
  'laki': 'Лаки',
  'emali-basovie': 'Базовая эмали',
  'emali-strukturnie': 'Структурная эмаль',
  'emali-dlya-diskov': 'Для дисков',
  'emali-dlya-skolov': 'Для сколов',
  'shpatlevka': 'Шпатлевка',
  'shpatlevka-bazovaya': 'Базовая шпатлевка',
  'shpatlevka-strukturnaia': 'Структурная шпатлевка',
  'shpatlevka-dlya-diskov': 'Для дисков',
  'shpatlevka-dlya-skolov': 'Для сколов',
  'grunti': 'Грунты',
  'rashodnye-materiali': 'Расходные материалы',
  'rashodnye-materiali-bazovaya': 'Базовая',
  'rashodnye-materiali-strukturnaia': 'Структурная',
  'rashodnye-materiali-diski': 'Для дисков',
  'rashodnye-materiali-skoly': 'Для сколов',
  'aerosoli': 'Аэрозоли',
}

export const getUsd = async () => {
 try {
  const response = await fetch(
    "https://api.nbrb.by/exrates/rates/431/?periodicity=0"
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.Cur_OfficialRate;
 } catch (error) {
  console.log(error)
 }
};