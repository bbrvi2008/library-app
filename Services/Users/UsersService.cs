using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using library.Infrastructure;
using library.Services.Users.Dto;
using library.Services.Users.Models;
using library.Services.Errors.Entities;

namespace library.Services.Users
{
  public class UsersService
  {
    private ApplicationContext _db;

    public UsersService(ApplicationContext context)
    {
      _db = context;
    }

    public async Task<User> Registration(User userData)
    {
      var hasUser = await _db.Users.AnyAsync(user => user.Username == userData.Username);
      if (hasUser) {
        throw new BadRequestException("Пользователь уже существует");
      }

      userData.Password = BCrypt.Net.BCrypt.HashPassword(userData.Password);

      await _db.Users.AddAsync(userData);
      await _db.SaveChangesAsync();

      return userData;
    }

    public async Task<UserLoginedDto> Login(UserLoginDto userData)
    {
      var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == userData.Username);
      var passwordVerified = BCrypt.Net.BCrypt.Verify(userData.Password, user.Password);
      if(user == null || !passwordVerified) {
        throw new BadRequestException("Введено неправильное имя пользователя или пароль");
      }

      var identity = GetIdentity(user);
      return new UserLoginedDto
      {
        Username = identity.Name,
        Token = GetJwtToket(identity)
      };
    }

    private ClaimsIdentity GetIdentity(User user)
    {
      var claims = new List<Claim>
      {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Username)
      };
      ClaimsIdentity claimsIdentity = new ClaimsIdentity(
        claims,
        "Token",
        ClaimsIdentity.DefaultNameClaimType,
        ClaimsIdentity.DefaultRoleClaimType
      );

      return claimsIdentity;
    }

    private string GetJwtToket(ClaimsIdentity identity)
    {
      var now = DateTime.UtcNow;

      var jwt = new JwtSecurityToken(
        issuer: AuthOptions.ISSUER,
        audience: AuthOptions.AUDIENCE,
        notBefore: now,
        claims: identity.Claims,
        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
      );

      return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
  }
}