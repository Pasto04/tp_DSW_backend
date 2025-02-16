import { z } from 'zod'
import { Response } from 'express'

function isConflictError(error: any): boolean {
  const errorTypes = ['PreconditionFailed', 'Conflict', 'Already', 'AllBusy', 'HasNo', 'NotEnough']
  let result
  errorTypes.forEach((errorType) => {
    if (error.type.includes(errorType)) {
      result = true
    }
  })
  if (result === undefined) {
    result = false
  }
  return result
}

function isNotAllowedError(error: any): boolean {
  const errorTypes = ['IsNotAllowed']
  let result
  errorTypes.forEach((errorType) => {
    if (error.type.includes(errorType)) {
      result = true
    }
  })
  if (result === undefined) {
    result = false
  }
  return result
}

function isUnauthorizedError(error: any): boolean {
  const errorTypes = ['Unauthorized']
  let result
  errorTypes.forEach((errorType) => {
    if (error.type.includes(errorType)) {
      result = true
    }
  })
  if (result === undefined) {
    result = false
  }
  return result
}

function handleErrors(error: any, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).json({message: `ValidationError: ${JSON.parse(error.message)[0].message}`})
  } else if (error.type) {
    if (error.type.includes('NotFoundError')) {
      res.status(404).json({ message: error.message })
    } else if (isConflictError(error)) {
      res.status(409).json({ message: error.message })
    } else if (isNotAllowedError(error)) {
      res.status(403).json({ message: error.message })
    } else if (isUnauthorizedError(error)) {
      res.status(401).json({ message: error.message })
    } else {
      res.status(400).json({ message: error.message })
    }
  } else {
    res.status(500).json({ message: `Name: ${error.name} | Message: ${error.message}` })
  }
}

export { handleErrors }
