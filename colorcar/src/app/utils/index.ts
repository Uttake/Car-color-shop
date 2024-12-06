export const fixStyleString = (htmlString: string): string => {
    return htmlString
      .replace(/\\&quot;/g, '"')
      .replace(/\\"/g, '"')
      .replace(/^"|"$/g, "")
      .trim();
  };

export const description : Record<string, string> = {
  'emali': 'Эмали',
  'laki': 'Лаки',
}

export const getUsd = async () => {
  const response = await fetch(
    "https://api.nbrb.by/exrates/rates/431/?periodicity=0"
  );
  const data = await response.json();
  return data.Cur_OfficialRate;
};