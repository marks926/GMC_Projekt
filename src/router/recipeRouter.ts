import express, {Request, Response} from "express";
import * as recipeModel from "../models/recipe";
import {Recipe} from "../types/recipes";
const recipeRouter = express.Router();


recipeRouter.get("/", async (req: Request, res: Response) => {
  recipeModel.findAll((err: Error, recipes: Recipe[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"recipes": recipes});
  });
});


recipeRouter.post("/", async (req: Request, res: Response) => {
  const newRecipe: Recipe = req.body;
  recipeModel.create(newRecipe, (err: Error, recipeID: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"recipeID": recipeID});
  });
});

recipeRouter.get("/:id", async (req: Request, res: Response) => {
  const recipeID: number = Number(req.params.id);
  recipeModel.findRecipe(recipeID, (err: Error, recipe: Recipe) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"recipe": recipe});
  })
});

recipeRouter.put("/:id", async (req: Request, res: Response) => {
  const recipe: Recipe = req.body;
  recipe.recipeID = Number(req.params.id);
  recipeModel.update(recipe, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

recipeRouter.delete("/:id", async (req: Request, res: Response) => {
  const recipeID: number = Number(req.params.id);
  recipeModel.deleteRecipe(recipeID, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});


export {recipeRouter};