// Temperature converter
const kelvin_celcius_converter = function (temp_in_kelvin) {
  const CONSTANT = 273.15;
  const temp_in_celcius = temp_in_kelvin - CONSTANT;
  return temp_in_celcius + '°C';
};

const result = kelvin_celcius_converter(300);
console.log(result);
