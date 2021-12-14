"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../../../Exceptions/RecordNotFoundException')} */
const RecordNotFoundException = use("App/Exceptions/RecordNotFoundException");
/** @type {typeof import('../../../../Utils')} */
const { getAuthJwtPayload, getRequestFilter } = use("App/Utils");
/** @type {typeof import('../../../../Helper/Entities/talent')} */
const Talent = use("App/Helper/Entities/talent");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");

/**
 * Resourceful controller for interacting with talents
 */
class TalentController {
  /**
   * Show a list of all talents.
   * GET talents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response, auth }) {
    try {
      const { filters } = request.only(["filters"]);
      const { user_role_id: userRoleId } = getAuthJwtPayload(auth);
      const requestFilter = getRequestFilter(filters);
      requestFilter.scopesPrivate = {
        published: true,
      };

      return response
        .status(200)
        .json(await Talent.all(userRoleId, requestFilter));
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Display a single talent.
   * GET talents/:id
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

      const talent = await Talent.find(id, requestFilter);
      if (!talent) {
        throw new RecordNotFoundException(
          "Talent not found or you don't have permission to access it"
        );
      }

      return response.status(200).json(talent);
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Update talent details.
   * PUT or PATCH talents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    try {
      const { id } = params;
      const payload = request.only([
        "first_name",
        "last_name",
        "status_id",
        "wish_salary",
        "funcional_title_id",
        "title",
        "seniority_id",
        "industry_id",
        "location_id",
        "relocation_id",
        "phone",
        "email",
        "company_id",
        "process_status_id",
        "post_type",
      ]);

      return response.status(200).json(await Talent.update(id, payload));
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Delete a talent with id.
   * DELETE talents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const { id } = params;

      await Talent.destroy(id);

      return response.status(200).json({
        message: "Successfully removed",
      });
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }
}

module.exports = TalentController;
