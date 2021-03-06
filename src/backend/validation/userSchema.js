import Ajv from "ajv";
import { INTERESTS } from "../../tools/constants";
const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[a-zA-Z'-]+$",
      minLength: 3,
      maxLength: 16,
    },
    email: {
      type: "string",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      minLength: 6,
      maxLength: 32,
    },
    password: {
      type: "string",
      pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$",
    },
    img: { type: "string" },
    interests: {
      type: "array",
      maxItems: 6,
      minItems: 2,
      items: { type: "string", enum: INTERESTS },
      uniqueItems: true,
    },
  },
  required: ["name", "email", "password", "interests"],
};

function handler() {
  return ajv.compile(userSchema);
}

export const validate = handler();
