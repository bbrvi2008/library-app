using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using library.Models;
using library.Dto;
using library.Infrastructure;

namespace library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private ApplicationContext _db;

    public UsersController(ApplicationContext context)
    {
      _db = context;
    }

    [HttpPost("")]
    public ActionResult<User> PostUser(User model)
    {
      var hasUser = _db.Users.Any(user => user.Username == model.Username);
      if(hasUser) {
        return BadRequest(new { message = "Пользователь уже существует." });
      }

      _db.Users.Add(model);
      _db.SaveChanges();

      return Ok(model);
    }

    [HttpPost("login")]
    public ActionResult<UserLoginedDto> Login(UserLoginDto user)
    {
      var identity = GetIdentity(user);
      if (identity == null)
      {
        return BadRequest(new { message = "Неправильное имя пользователя или пароль." });
      }

      var now = DateTime.UtcNow;
      // создаем JWT-токен
      var jwt = new JwtSecurityToken(
        issuer: AuthOptions.ISSUER,
        audience: AuthOptions.AUDIENCE,
        notBefore: now,
        claims: identity.Claims,
        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
      );
      var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

      var userLogined = new UserLoginedDto
      {
        Username = identity.Name,
        Token = encodedJwt
      };

      return Ok(userLogined);
    }

    private ClaimsIdentity GetIdentity(UserLoginDto user)
    {
      var userdb = _db.Users.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);
      if (userdb != null)
      {
        var claims = new List<Claim>
        {
          new Claim(ClaimTypes.NameIdentifier, userdb.Id.ToString()),
          new Claim(ClaimsIdentity.DefaultNameClaimType, userdb.Username)
        };
        ClaimsIdentity claimsIdentity = new ClaimsIdentity(
          claims, 
          "Token", 
          ClaimsIdentity.DefaultNameClaimType, 
          ClaimsIdentity.DefaultRoleClaimType
        );

        return claimsIdentity;
      }

      return null;
    }
  }
}