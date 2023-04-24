import { Request, Response, NextFunction } from "express";
import { wrongSchemaError } from "../utils/errorUtils";

export function schemaValidate(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) throw wrongSchemaError(error.details[0].message);
    next();
  };
}
