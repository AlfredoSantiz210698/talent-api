"use strict";

/*
|--------------------------------------------------------------------------
| CurrencySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Currency = use("App/Models/Currency");

class CurrencySeeder {
  async run() {
    const currencies = this.getCurrencies();

    for (const currency of currencies) {
      const currencyModel = await Currency.findBy("symbol", currency.symbol);

      if (currencyModel) {
        currencyModel.merge(currency);
        await currencyModel.save();
      } else {
        await Factory.model("App/Models/Currency").create(currency);
      }
    }
  }

  getCurrencies() {
    return [
      {
        symbol: "USD",
        name: "US dollar",
        country: "United States",
      },
      {
        symbol: "MXN",
        name: "Peso mexicano",
        country: "México",
      },
    ];
  }
}

module.exports = CurrencySeeder;
