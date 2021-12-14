/** @type {typeof import('../../app/Utils')} */
const { isEmptyString } = use("App/Utils");
/** @type {typeof import('../../app/Helper/constants')} */
const { FIREBASE_OBJECT_NOT_FOUND } = use("App/Helper/constants");
const { initializeApp } = use("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } =
  use("firebase/storage");
const config = use("Config/firebase");
const app = initializeApp(config);

/**
 * Upload file.
 *
 * @param {Array} file
 * @param {string} name
 * @throws {Error}
 * @return {string}
 */
const upload = async (file, name) => {
  try {
    if (!name) {
      const unixTime = new Date().valueOf();
      name = `${unixTime}_${file.clientName}`;
    }

    const storageRef = ref(getStorage(app), name);
    const fileUploaded = await uploadBytes(storageRef, file.content, {
      contentType: file.contentType,
    });

    return await getDownloadURL(fileUploaded.ref);
  } catch (error) {
    throw error;
  }
};

/**
 * Remove file.
 * @throws error
 * @return {*}
 */
const removeByPath = async (path) => {
  try {
    if (isEmptyString(path)) return false;

    const storageRef = ref(getStorage(app), path);

    return await deleteObject(storageRef);
  } catch (error) {
    if(error.code !== FIREBASE_OBJECT_NOT_FOUND){
      throw error;
    }
  }
};

module.exports = {
  upload,
  removeByPath,
};
