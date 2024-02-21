const numberConverter = (msisdn_no) => {
  let converted_number = msisdn_no;

  if (msisdn_no.slice(0, 1) == '0') {
    let rest_of_number = msisdn_no.slice(1, msisdn_no.length);

    converted_number = `232${rest_of_number}`;
  }

  return converted_number;
};

module.exports = numberConverter;
