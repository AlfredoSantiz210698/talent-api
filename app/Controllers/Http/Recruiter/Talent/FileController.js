"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('../../../../Services/storage')} */
const Storage = use("App/Services/storage");
/** @type {typeof import('../../../../Utils')} */
const { setProcessFields, setProcessFile, getAuthJwtPayload, isEmptyArray } =
  use("App/Utils");
/** @type {typeof import('../../../../Helper/Entities/talentFile')} */
const TalentFile = use("App/Helper/Entities/talentFile");
/** @type {typeof import('../../../../Helper/Entities/fileType')} */
const FileType = use("App/Helper/Entities/fileType");
const exceptionResponseFactory = use("App/Exceptions/exceptionResponseFactory");
/** @type {typeof import('../../../../Validators/Recruiter/Talent/File/Store')} */
const FileStore = use("App/Validators/Recruiter/Talent/File/Store");
/** @type {typeof import('../../../../Validators/ValidationFailureHandler')} */
const ValidationFailureHandler = use("App/Validators/ValidationFailureHandler");

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Show a list of all files.
   * GET files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ params, response }) {
    try {
      const { talents_id } = params;
      return response.status(200).json(await TalentFile.all(talents_id));
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response, auth }) {
    try {
      const [requestProcessed, requestError] =
        await this._storeToProcessRequestMultipart(params, request, auth);

      if (requestError) {
        return response.status(400).json(requestError);
      }

      const {
        payload: { file, file_type_code },
      } = requestProcessed;
      const { talents_id } = requestProcessed.params;
      const fileType = await FileType.findByCode(file_type_code);
      const unixTime = new Date().valueOf();
      const nameUpload = `${unixTime}_${file.clientName}`;

      const path = await Storage.upload(file, nameUpload);
      const talentFile = await TalentFile.create({
        talent_id: talents_id,
        name: file.clientName,
        extension: file.extname,
        file_type_id: fileType.id,
        path,
      });

      return response.status(201).json(talentFile);
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }

  /**
   * Process request multipart for @method store
   *
   * @param {object} ctx
   * @return {array} [request, jsonError]
   */
  async _storeToProcessRequestMultipart(params, request, auth) {
    const { user_role_id: userRoleId } = getAuthJwtPayload(auth);

    const payload = await setProcessFields(request);
    payload.talents_id = params.talents_id;
    const file = await setProcessFile(request, FileStore.getFilesRules("file"));

    await request.multipart.process();

    if (!isEmptyArray(file.errors)) {
      return [null, ValidationFailureHandler.getJsonErrorResponse(file.errors)];
    }

    await FileStore.validate(payload, { userRoleId });
    if (FileStore.getValidation().fails()) {
      return [
        null,
        ValidationFailureHandler.getJsonErrorResponse(
          FileStore.getValidation().messages()
        ),
      ];
    }

    const requestProcessed = {
      params,
      payload: {
        ...payload,
        file,
      },
    };

    return [requestProcessed, null];
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    try {
      const { id } = params;

      await TalentFile.destroy(id);

      return response.status(200).json({
        message: "Successfully removed",
      });
    } catch (error) {
      return response.status(400).json(exceptionResponseFactory(error));
    }
  }
}

module.exports = FileController;
