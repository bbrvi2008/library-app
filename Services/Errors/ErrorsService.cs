using System;
using library.Services.Errors.Dto;
using library.Services.Errors.Entities;

namespace library.Services.Errors
{
  public class ErrorsService
  {
    public ErrorResponse handleError(Exception exception)
    {
      var code = 500;

      if (exception is NotFoundException) code = 404;
      else if (exception is ForbidException) code = 403;
      else if (exception is BadRequestException) code = 400;

      return new ErrorResponse(exception, code);
    }
  }
}