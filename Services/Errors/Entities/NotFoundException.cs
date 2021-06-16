using System;

namespace library.Services.Errors.Entities
{
    public class NotFoundException: Exception
    {
        public NotFoundException(string message): base(message)
        {
            
        }
    }
}