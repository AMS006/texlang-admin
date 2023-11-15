import axios from "axios";

export const setHeaders = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`
}

export const isValidDate = (dateString) =>{
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && !isNaN(date.getTime());
}

export const  numberToWords = (number) => {
  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands = ["", "thousand", "million", "billion", "trillion"];

  function convertLessThanOneThousand(num) {
    if (num === 0) {
      return "";
    } else if (num < 10) {
      return units[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else if (num < 100) {
      return tens[Math.floor(num / 10)] + " " + convertLessThanOneThousand(num % 10);
    } else {
      return units[Math.floor(num / 100)] + " hundred " + convertLessThanOneThousand(num % 100);
    }
  }

  function convert(num) {
    if (num === 0) {
      return "zero";
    }

    let result = "";
    let i = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        result = convertLessThanOneThousand(num % 1000) + " " + thousands[i] + " " + result;
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return result.trim();
  }

  return convert(number);
}

