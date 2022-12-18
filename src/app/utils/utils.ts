import { PriceInformation } from '../models/searchResponse-model';

export default function resolveLink(
  page?: number,
  category?: string,
  productName?: string
): string {
  if (category && page) {
    return `/products/${category}/${page}`;
  } else if (category && !page) {
    return `/products/${category}/1`;
  } else if (productName) {
    return `/product/${productName}`;
  } else if (page) {
    return `/products/${page}`;
  }

  return '/products/1';
}

export const resolveImageLink = (id: string, name: string): string => {
  const baseLink: string = 'https://www.nichea.co.za/nichea/file/';
  return !!id && !!name
    ? `${baseLink}${id}/${name}`
    : 'https://www.nichea.co.za/assets/img/fallback-file.png';
};

// Remove HTML tag and add full stops followed by a space.
export const removeHTML = (text: string): string => {
  text = text
    .replace(/<.{1,5}>|<.{1,84}>|&.{0,7};|\.{1,2}|\.{4,}/gi, '')
    .replace(/\n+/, '. ')
    .trim();

  // Replace new line characters with full stop followed by a space.
  if (text.lastIndexOf('.') !== text.length - 1) {
    text += '.';
  }

  return text;
};

export const capitalizeNewSentence = (text: string): string => {
  text = text.charAt(0).toUpperCase() + text.slice(1);

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '.' && i !== text.length - 1) {
      text =
        text.slice(0, i + 2) +
        text.charAt(i + 2).toLocaleUpperCase() +
        text.slice(i + 3);
    }
  }

  return text;
};

export const getLowestPrice = (prices: PriceInformation[]): number => {
  const cleanPrice: PriceInformation[] = prices.filter(
    (price: PriceInformation) => price.retail !== 0
  );
  let minimum: number = cleanPrice[0].retail;

  for (const price of cleanPrice) {
    price.retail < minimum ? (minimum = price.retail) : '';
  }

  return minimum;
};
