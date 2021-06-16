using Microsoft.AspNetCore.Mvc;
using library.Infrastructure;
using library.Services.Users.Models;
using library.Services.Users.Dto;
using library.Services.Users;
using System.Threading.Tasks;

namespace library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private UsersService _usersService;

    public UsersController(ApplicationContext context)
    {
      _usersService = new UsersService(context);
    }

    [HttpPost("")]
    public async Task<ActionResult<User>> PostUser(User userData)
    {
      return Ok(await _usersService.Registration(userData));
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserLoginedDto>> Login(UserLoginDto userData)
    {
      return Ok(await _usersService.Login(userData));
    }
  }
}