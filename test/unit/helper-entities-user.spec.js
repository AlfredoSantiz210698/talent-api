"use strict";

/** @type {typeof import('../../app/Helper/Entities/user')} */
const User = use("App/Helper/Entities/user");
const { test } = use("Test/Suite")("HelperEntitiesTalent");

test("Check that user exists", async ({ assert }) => {
  const email = "director@gmail.com";
  const role_id = 2;
  const user = await User.getUserForAuth(email, role_id);
  assert.isObject(user);
});

test("Check that user doesn't exists", async ({ assert }) => {
  const email = "director@gmail.com";
  const role_id = 1;
  const user = await User.getUserForAuth(email, role_id);
  assert.isNull(user);
});
