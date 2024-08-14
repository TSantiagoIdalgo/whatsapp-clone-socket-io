import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;
    const request = ctx.getRequest() as Request;
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException 
      ? exception.getResponse()
      : 'INTERNAL_SERVER_ERROR';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      exception_type: message['message'] || 
        exception instanceof HttpException 
        ? (exception as any).message 
        : 'INTERNAL_SERVER_ERROR',
      reasons: { ...exception['options'], ...exception['response'] },
    };
    
    response.status(status).json(errorResponse);
  }
}
