// Funtion to convert naira to dollar
const naira_dollar_converter = (amount_in_naira) => {
  const exchange_rate = 1600;
  const dollar_equivalent = amount_in_naira / exchange_rate;
  return '$' + dollar_equivalent;
};

const result = naira_dollar_converter(40000);
console.log(result); // -> $25
