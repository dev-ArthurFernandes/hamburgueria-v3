import { Request, Response, NextFunction } from "express";
import { TypeORMError } from "typeorm";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number = 400){
    super()
    this.message = message
    this.statusCode = statusCode
  }
}

const handleError = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  
  if (err instanceof AppError) {
    console.log(err)
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  if (err instanceof ZodError) {
    console.log(err.flatten())
    return res.status(400).json({
      message: err.flatten().fieldErrors
    })
  }

  if (err instanceof TypeORMError) { 
    console.log(err)
    return res.status(400).json({
      message: err.message
    })
  }

  console.log(err)

  return res.status(500).json({
    message: "Internal server error!"
  })
}

export {
  AppError,
  handleError
}