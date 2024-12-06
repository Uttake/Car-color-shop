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