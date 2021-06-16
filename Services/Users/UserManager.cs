using System;
using System.Security.Claims;

namespace library.Services.Users
{
  public class UserManager
  {
    public int? GetUserId(ClaimsPrincipal user)
    {
      var UserIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

      if (!string.IsNullOrEmpty(UserIdClaim))
      {
        return Convert.ToInt32(UserIdClaim);
      }

      return null;
    }
  }
}