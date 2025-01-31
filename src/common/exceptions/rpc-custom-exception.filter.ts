import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcError {
  status: number;
  message: string;
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // asi funciona para mi
    // throw new BadRequestException(exception.getError());

    // integracion de fernando herrera

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rcpError = exception.getError() as RpcError;

    if (rcpError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rcpError.toString().substring(0, rcpError.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rcpError === 'object' &&
      'status' in rcpError &&
      'message' in rcpError
    ) {
      const status = rcpError.status;
      return response.status(status).json(rcpError);
    }

    console.log('exception', exception);
    response.status(500).json({
      status: 500,
      message: 'Internal server erroor',
    });
  }
}
