import { User } from "./user";

export interface Recipe {
    recipeID: number,
    recipeName: string,
    description: string,
    userID: number,
    lastChange: Date,
    createdOn: Date
  }