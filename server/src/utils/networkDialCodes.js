const orange_dial_codes_regular = [
  '072',
  '073',
  '074',
  '075',
  '076',
  '078',
  '079',
];

const orange_dial_codes_with_country_code = [
  '23272',
  '23273',
  '23274',
  '23275',
  '23276',
  '23278',
  '23279',
];

const africell_dial_codes_regular = [
  '077',
  '088',
  '099',
  '090',
  '080',
  '033',
  '030',
];

const africell_dial_codes_with_country_code = [
  '23277',
  '23288',
  '23299',
  '23290',
  '23280',
  '23233',
  '23230',
];

const qcell_dial_codes_regular = ['031', '032', '034'];

const qcell_dial_codes_with_country_code = ['23231', '23232', '23234'];


// check network type
const checkNetworkType = (msisdn_no) => {
  let network;

  if (msisdn_no.slice(0, 3) == '232') {
    if (africell_dial_codes_with_country_code.includes(msisdn_no.slice(0, 5))) {
      network = 'Africell';
    }

    if (orange_dial_codes_with_country_code.includes(msisdn_no.slice(0, 5))) {
      network = 'Orange';
    }

    if (qcell_dial_codes_with_country_code.includes(msisdn_no.slice(0, 5))) {
      network = 'QCell';
    }
  } else {
    if (africell_dial_codes_regular.includes(msisdn_no.slice(0, 3))) {
      network = 'Africell';
    }

    if (orange_dial_codes_regular.includes(msisdn_no.slice(0, 3))) {
      network = 'Orange';
    }

    if (qcell_dial_codes_regular.includes(msisdn_no.slice(0, 3))) {
      network = 'QCell';
    }
  }

  return network;
};

module.exports = checkNetworkType;
