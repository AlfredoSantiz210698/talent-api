"use strict";

const { test, trait } = use("Test/Suite")("Auth");
/** @type {typeof import('../../app/Helper/Entities/user')} */
const User = use("App/Helper/Entities/user");

trait("Test/ApiClient");

test("[SigIn - director user] access with correct credencials", async ({
  client,
}) => {
  const email = "director@gmail.com";
  const password = "#Talent21";
  const role_id = 2;

  const response = await client
    .post("/api/v1/auth/signin")
    .send({
      email,
      password,
      role_id,
    })
    .end();

  response.assertStatus(200);
});

test("[SigIn - director user] access with bad credencials", async ({
  client,
}) => {
  const email = "director@gmail.com";
  const password = "badPassword";
  const role_id = 2;

  const response = await client
    .post("/api/v1/auth/signin")
    .send({
      email,
      password,
      role_id,
    })
    .end();

  response.assertStatus(400);

  response.assertJSONSubset({
    message: "Cannot verify user password",
    code: "E_PASSWORD_MISMATCH",
  });
});

test("[SigIn - director user] access with bad role", async ({ client }) => {
  const email = "director@gmail.com";
  const password = "#Talent21";
  const role_id = 4;

  const response = await client
    .post("/api/v1/auth/signin")
    .send({
      email,
      password,
      role_id,
    })
    .end();

  response.assertStatus(400);

  response.assertJSONSubset({
    message: "User not found with the received data",
    code: "E_NOT_AUTHORIZED",
  });
});
