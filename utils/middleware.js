const logger = require('./logger');

const requestLogger = (req,res,next) => {
    logger.info('Method: ', req.method);
    logger.info('Path: ', req.path);
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
    console.log('errorHandler executed!')
    console.log(error.kind)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
      return error.errors.title ? response.status(400).json({ error: 'Title minlength needed' }) : response.status(400).json({ error: 'Description minlength needed '})
    }
    else {
      return response.status(400).json({ error: 'lmao idk man' })
    } 
  
    next(error);
  }


module.exports = {
    requestLogger, 
    errorHandler, 
    unknownEndpoint
}