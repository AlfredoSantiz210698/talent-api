"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../../Helper/Entities/seniority')} */
const Seniority = use("App/Helper/Entities/seniority");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");

/**
 * Resourceful controller for interacting with seniorities
 */
class SeniorityController {
  /**
   * Show a list of all seniorities.
   * GET seniorities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    try {
      return response.status(200).json(await Seniority.all());
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }
}

module.exports = SeniorityController;
