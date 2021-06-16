using System;

namespace library.Services.Errors.Entities
{
    public class BadRequestException: Exception
    {
        public BadRequestException(string message): base(message)
        {
            
        }
    }
}