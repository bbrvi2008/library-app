using System;

namespace library.Services.Errors.Entities
{
    public class ForbidException: Exception
    {
        public ForbidException(string message): base(message)
        {
            
        }
    }
}