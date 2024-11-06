import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DateTime } from 'luxon'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof BadRequestException) {
      response.status(status).send(exception.getResponse());
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).send({
      success: false,
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message || 'Unexpected error occurred',
      time: DateTime.now().toFormat('HH:mm dd.MM.yyyy'),
      path: request.url,
    });
  }
}