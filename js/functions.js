//Функция для проверки длины строки
let checkStringLength = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

checkStringLength('привет', 20);

// Функция для проверки, является ли строка палиндромом
let checkPalindrom = function (string) {
  string = string.toLowerCase().replace(' ', '');
  let lastCharacterIndex = string.length - 1;
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(lastCharacterIndex - i)) {
      return false;
    }
  }
  return true;
};

checkPalindrom ('Довод');

/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и
возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN */
let extractNumber = function (string) {
  let number = '';
  if (typeof string === 'number') {
    string = String(string);
  }
  for (let i = 0; i < string.length; i++) {
    if (isNaN(parseInt(string[i], 10)) !== true) {
      number += string[i];
    }
  }
  return parseInt(number);
};

extractNumber(-1234.4);
extractNumber('1 кефир, 0.5 батона');

/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
 — и возвращает исходную строку, дополненную указанными символами до заданной длины.
 Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца. */
let functionName = function (string, minString, extraSymbolsString) {
  let newString = '';
  if (minString <= string.length) {
    return string;
  } else {
    for (let i = 0; i < minString - string.length; i++) {
      extraSymbolsString = extraSymbolsString.repeat(minString - string.length);
      newString += extraSymbolsString[i];
    }
  }
  newString += string;
  return newString;
};

functionName('quq', 8, 'we');
