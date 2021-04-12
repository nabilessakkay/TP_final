const supportedInstruments = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: [
        'visa',
        'mastercard',
        'amex',
        'discover',
        'diners',
        'jcb',
        'unionpay',
      ],
    },
  },
];

const details = {
  displayItems: [
    {
      label: 'Original donation amount',
      amount: { currency: 'USD', value: '65.00' },
    },
    {
      label: 'Friends and family discount',
      amount: { currency: 'USD', value: '-10.00' },
    },
  ],
  total: {
    label: 'Total due',
    amount: { currency: 'USD', value: '55.00' },
  },
};

export async function pay() {
  const request = new PaymentRequest(supportedInstruments, details);
  try {
    const result = await request.show();
    console.log(result);
    return result.complete('fail');
  } catch (error) {
    console.error(error);
  }
}
