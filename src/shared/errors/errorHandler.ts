import { z } from 'zod'
import { Response } from 'express'

function handleErrors(error: any, res: Response) {
  if(error instanceof z.ZodError) {
    res.status(400).json({message: `ValidationError: ${JSON.parse(error.message)[0].message}`})

  } else if(error.type) {
    res.status(400).json({message: error.message})
    
  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({message: error.sqlMessage})

  } else {
    res.status(500).json({message: error.message})
  }
}

export { handleErrors }