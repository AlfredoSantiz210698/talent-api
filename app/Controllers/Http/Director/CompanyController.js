"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../../../Utils')} */
const { promiseResolver, getRequestFilter } = use("App/Utils");
/** @type {typeof import('../../../Helper/Entities/company')} */
const Company = use("App/Helper/Entities/company");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");
/** @type {typeof import('../../../Exceptions/RecordNotFoundException')} */
const RecordNotFoundException = use("App/Exceptions/RecordNotFoundException");
/** @type {typeof import('../../../Exceptions/RecordNotCreatedException')} */
const RecordNotCreatedException = use(
  "App/Exceptions/RecordNotCreatedException"
);

/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    try {
      const { filters } = request.only(["filters"]);
      const requestFilter = getRequestFilter(filters);

      return response.status(200).json(await Company.all(requestFilter));
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const payload = request.only([
        "name",
        "email",
        "phone",
        "company_type_id",
        "location_id",
        "currency_id",
        "latitude",
        "longitude",
      ]);
      const [company, companyError] = await promiseResolver(
        Company.create(payload)
      );

      if (companyError) {
        console.log(companyError);
        throw new RecordNotCreatedException("Company couldn't be created");
      }

      return response.status(201).json(company);
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    try {
      const { id } = params;
      const { filters } = request.only(["filters"]);
      const requestFilter = getRequestFilter(filters);

      const company = await Company.find(id, requestFilter);
      if (!company) {
        throw new RecordNotFoundException("Company not found");
      }

      return response.status(200).json(company);
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { id } = params;
      const payload = request.only([
        "name",
        "email",
        "phone",
        "company_type_id",
        "location_id",
        "currency_id",
        "latitude",
        "longitude",
      ]);

      return response.status(200).json(await Company.update(id, payload));
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }
}

module.exports = CompanyController;
