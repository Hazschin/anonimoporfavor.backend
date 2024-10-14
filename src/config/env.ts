import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  MONGODB_URI: string;
}

const schema = joi
  .object({
    MONGODB_URI: joi.string().required(),
  })
  .unknown();

const { error, value } = schema.validate(process.env);

if (error) throw new Error('Hay un problema con las variables de entorno');

const Envs: Env = value;

export const env = {
  MONGODB_URI: Envs.MONGODB_URI,
};
