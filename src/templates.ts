import type { Template } from "odyc";
import { SPRITES } from "./sprites";

const grass: Template = {
  sprite: SPRITES.grass,
  solid: false,
};

const apple: Template = {
  sprite: SPRITES.apple,
};

const body: Template = {
  sprite: SPRITES.playerBody,
};

const templates: Record<string, Template> = {
  g: grass,
  a: apple,
  b: body,
};

export default templates;
