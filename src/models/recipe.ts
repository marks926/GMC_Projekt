
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Recipe } from "../types/recipes";

export const create = (recipe: Recipe, callback: Function) => {
    const queryString = "INSERT INTO Recipe (recipeName, description, userID, lastChange, createdOn) VALUES (?, ?, ?, ?, ?)"
  
    db.query(
      queryString,
      [recipe.recipeName, recipe.description, recipe.userID, recipe.lastChange, recipe.createdOn],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findRecipe = (recipeID: number, callback: Function) => {

    const queryString = `
      SELECT * FROM Recipe WHERE recipeID=?`
      
    db.query(queryString, recipeID, (err, result) => {
      if (err) {callback(err)}
      
      const row = (<RowDataPacket> result)[0];
      const recipe: Recipe =  {
        recipeID: row.recipeID,
        recipeName: row.recipeName,
        description: row.description,
        userID: row.userID,
        lastChange: row.lastChange,
        createdOn: row.createdOn
      }
      callback(null, recipe);
    });
};
export const findAll = (callback: Function) => {
  const queryString = `
  SELECT * FROM Recipe`

  db.query(queryString, (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const recipes: Recipe[] = [];

    rows.forEach(row => {
      const recipe: Recipe =  {
        recipeID: row.recipeID,
        recipeName: row.recipeName,
        description: row.description,
        userID: row.userID,
        lastChange: row.lastChange,
        createdOn: row.createdOn
      }
      recipes.push(recipe);
    });
    callback(null, recipes);
  });
};

export const update = (recipe: Recipe, callback: Function) => {
  const queryString = `UPDATE Recipe SET recipeName=?, description=?, lastChange=? WHERE recipeID=?`;

  db.query(
    queryString,
    [recipe.recipeName, recipe.description, recipe.lastChange, recipe.recipeID],
    (err, result) => {
      if (err) {callback(err)}
      callback(null);
    }
  );
};

export const deleteRecipe = (recipeID: number, callback: Function) => {
  const queryString = `DELETE FROM Recipe WHERE recipeID=?`;

  db.query(
    queryString,
    [recipeID],
    (err, result) => {
      if (err) {callback(err)}
      callback(null);
    }
  );
};