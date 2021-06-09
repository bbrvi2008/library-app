using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using library.Models;
using Microsoft.AspNetCore.Authorization;
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
      _db.Books.Add(model);
      _db.SaveChanges();

      return Ok(model);
    }

    [Authorize]
    [HttpPut("{id}")]
    public IActionResult PutBook(int id, Book model)
    {
      if(model == null) {
        return BadRequest();
      }

      // if(!_books.Any(book => book.Id == id)) {
      //   return NotFound();
      // }

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

      _db.Books.Remove(book);
      _db.SaveChanges();

      return Ok(book);
    }
  }
}