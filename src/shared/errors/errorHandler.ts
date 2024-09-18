import { z } from 'zod'
import { Response } from 'express'

function handleErrors(error: any, res: Response) {
  if(error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})

  } else if (error.name.includes('NotFoundError')) {
    res.status(404).json({message: `NotFoundError: ${error.message}`})

  } else if (error.name.includes('UniqueConstraintViolation')) {
    res.status(400).json({message: `UniqueConstrainViolation: ${error.message}`})

  } else if (error.name.includes('PreconditionFailed')) {
    res.status(412).json({message: `PreconditionFailed: ${error.message}`})

  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({message: error.sqlMessage})

  } else if (error.name.includes('TypeError')) {
    res.status(400).json({message: `TypeError: ${error.message}`})
  }
    else {
    res.status(500).json({message: error.message})
  }
}

export { handleErrors }