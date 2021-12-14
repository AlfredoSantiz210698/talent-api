"use strict";
/** @type {typeof import('../Utils')} */
const { isFunction, isEmptyObject } = use("App/Utils");

class QueryFilter {
  register(Model) {
    Model.toFilterQuery = ({
      builder,
      query = {},
      scopesPrivate = {},
      withs = {},
    }) => {
      for (const [key, value] of Object.entries(query)) {
        if (
          isFunction(builder[key]) &&
          isFunction(Model.getNamesPublicScopes) &&
          Model.getNamesPublicScopes().includes(key)
        ) {
          builder[key](value);
        }
      }

      for (const [key, value] of Object.entries(scopesPrivate)) {
        if (isFunction(builder[key])) {
          builder[key](value);
        }
      }

      const withsName = Object.keys(withs);
      for (const withName of withsName) {
        if (
          isFunction(Model.getWithPublicNames) &&
          Model.getWithPublicNames().includes(withName)
        ) {
          builder.with(withName);
        }
      }

      if (!isEmptyObject(query.orderBy)) {
        builder.orderBy(query.orderBy.key, query.orderBy.sortIn || "ASC");
      }

      return builder;
    };
  }
}

module.exports = QueryFilter;
