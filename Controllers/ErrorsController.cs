using library.Services.Errors;
using library.Services.Errors.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace library.Controllers
{
    [AllowAnonymous]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorsController: ControllerBase
    {
        public ErrorsService _errorsService { get; set; }
        public ErrorsController()
        {
            _errorsService = new ErrorsService();
        }

        [Route("error")]
        public ErrorResponse Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context.Error;

            var errorResponse = _errorsService.handleError(exception);
            Response.StatusCode = errorResponse.StatusCode;

            return errorResponse;
        }
    }
}