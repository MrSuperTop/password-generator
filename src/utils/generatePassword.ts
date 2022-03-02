import { FormValues } from 'src/types/formValues';
import { choice } from './choice';
import { pullAll } from 'lodash-es';

export const charSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  specialSymbols: '!"#$%&\'()*+,-./:;<=>?@[]^_\\{|}~',
  numbers: '0123456789'
} as const;

export const generatePassword = (
  values: FormValues
): string => {
  let password = '';
  let charSet = values.toUseCustomCharset ? values.customCharset.split('') : [];

  if (!values.toUseCustomCharset) {
    const keys = Object.keys(charSets) as (keyof typeof charSets)[];
    for (let key of keys) {
      key = key as keyof typeof charSets;
  
      if (values[key]) {
        charSet = charSet.concat(charSets[key].split(''));
      }
    }
  }

  if (values.toExclude) {
    let charsToExclude = values.charsToExclude.toLowerCase() + values.charsToExclude.toUpperCase();
    pullAll(charSet, charsToExclude.split(''));
  }

  if (charSet.length === 0) return '';

  for (let i = 0; i < values.length; i++) {
    let newItem = choice(charSet);
    password += newItem;
  }

  return password;
};
