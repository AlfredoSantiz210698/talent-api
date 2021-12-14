"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../../Helper/Entities/industry')} */
const Industry = use("App/Helper/Entities/industry");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");

/**
 * Resourceful controller for interacting with industries
 */
class LocationController {
  /**
   * Show a list of all industries.
   * GET industries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    try {
      return response.status(200).json(await Industry.all());
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }
}

module.exports = LocationController;
