using System.Security.Claims;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using library.Infrastructure;

namespace library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BooksController : ControllerBase
  {
    private ApplicationContext _db;

    public BooksController(ApplicationContext context)
    {
        _db = context;
    }

    [HttpGet("")]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
      return _db.Books.ToList();
    }

    [Authorize]
    [HttpGet("user")]
    public ActionResult<IEnumerable<Book>> GetUserBooks()
    {
      return _db.Books.Where(book => book.OwnerId == GetUserId() && book.OwnerId != null).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Book> GetBookById(int id)
    {
      var book = _db.Books.FirstOrDefault<Book>(book => book.Id == id);

      if(book == null) {
        return NotFound();
      }

      return new ObjectResult(book);
    }

    [Authorize]
    [HttpPost("")]
    public ActionResult<Book> PostBook(Book model)
    {
      model.OwnerId = GetUserId();

      _db.Books.Add(model);
      _db.SaveChanges();

      return Ok(model);
    }

    [Authorize]
    [HttpPut("{id}")]
    public IActionResult PutBook(int id, Book model)
    {
      var book = _db.Books.AsNoTracking().FirstOrDefault<Book>(book => book.Id == model.Id);

      if(book == null) {
        return NotFound();
      }

      if(book.OwnerId != GetUserId()) {
        return Forbid();
      }

      _db.Books.Update(model);
      _db.SaveChanges();

      return Ok(model);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public ActionResult<Book> DeleteBookById(int id)
    {
      var book = _db.Books.FirstOrDefault<Book>(book => book.Id == id);

      if(book == null) {
        return NotFound();
      }

      if(book.OwnerId != GetUserId()) {
        return Forbid();
      }

      _db.Books.Remove(book);
      _db.SaveChanges();

      return Ok(book);
    }

    private int? GetUserId() {
      var UserIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

      if(!string.IsNullOrEmpty(UserIdClaim)) 
      {
        return Convert.ToInt32(UserIdClaim);
      }

      return null;
    }
  }
}