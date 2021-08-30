"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRecipe = exports.create = void 0;
const db_1 = require("../db");
const create = (recipe, callback) => {
    const queryString = "INSERT INTO Recipe (recipeName, description, user, lastChange, createdOn) VALUES (?, ?, ?, ?, ?)";
    db_1.db.query(queryString, [recipe.recipeName, recipe.description, recipe.userID, recipe.lastChange, recipe.createdOn], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findRecipe = (recipeID, callback) => {
    const queryString = `
      SELECT * FROM Recipe WHERE recipeID=?`;
    db_1.db.query(queryString, recipeID, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const recipe = {
            recipeID: row.recipe_id,
            recipeName: row.recipe_name,
            description: row.description,
            userID: row.user_id,
            lastChange: row.last_change,
            createdOn: row.created_on
        };
        callback(null, recipe);
    });
    /*const queryString = `
      SELECT
        o.*,
        p.*,
        c.name AS customer_name,
        c.email
      FROM Recipe AS r
      INNER JOIN User AS u ON u.id=r.user_id
      INNER JOIN Product AS p ON p.id=o.product_id
      WHERE r.recipe_id=?`
      
    db.query(queryString, recipeID, (err, result) => {
      if (err) {callback(err)}
      
      const row = (<RowDataPacket> result)[0];
      const recipe: Recipe =  {
        recipeID: row.recipe_id,
        recipeName: row.recipe_name,
        description: row.description,
        user: {
          userID: row.user_id,
          userName: row.user_name,
          email: row.email
        },
        lastChange: row.last_change,
        createdOn: row.created_on
      }
      callback(null, recipe);
    });*/
};
exports.findRecipe = findRecipe;
