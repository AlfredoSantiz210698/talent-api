"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

const config = {
  apiKey: Env.get("API_KEY", ""),
  authDomain: Env.get("AUTH_DOMAIN", ""),
  projectId: Env.get("PROJECT_ID", ""),
  databaseURL: Env.get("DATABASE_URL", ""),
  storageBucket: Env.get("STORAGE_BUCKET", ""),
  messagingSenderId: Env.get("MESSAGING_SENDER_ID", ""),
  appId: Env.get("APP_ID", ""),
};

module.exports = config;
