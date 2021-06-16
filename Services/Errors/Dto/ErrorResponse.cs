using System;

namespace library.Services.Errors.Dto
{
  public class ErrorResponse
  {
    public string Type { get; set; }
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string StackTrace { get; set; }

    public ErrorResponse(Exception ex, int statusCode)
    {
      Type = ex.GetType().Name;
      StatusCode = statusCode;
      Message = ex.Message;
      StackTrace = ex.ToString();
    }
  }
}