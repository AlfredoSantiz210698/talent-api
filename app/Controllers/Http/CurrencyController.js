"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../../Helper/Entities/currency')} */
const Currency = use("App/Helper/Entities/currency");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");

/**
 * Resourceful controller for interacting with statuses
 */
class CurrencyController {
  /**
   * Show a list of all statuses.
   * GET statuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    try {
      return response.status(200).json(await Currency.all());
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }
}

module.exports = CurrencyController;
