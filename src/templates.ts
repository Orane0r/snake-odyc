import type { Template } from "odyc";

const grass: Template = {
  sprite: 7,
  solid: false,
};

const apple: Template = {
  sprite: 4,
};

const templates: Record<string, Template> = {
  g: grass,
  a: apple,
};

export default templates;
