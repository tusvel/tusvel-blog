import { validationResult } from 'express-validator';

export function handleErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors.array());
  }
  next();
}
