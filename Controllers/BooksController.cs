using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using library.Infrastructure;
using library.Services.Books.Models;
using library.Services.Books;
using library.Services.Users;
using System.Threading.Tasks;

namespace library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BooksController : ControllerBase
  {
    private BooksService _booksService;
    private UserManager _userManager { get; set; }

    public BooksController(ApplicationContext context)
    {
      _booksService = new BooksService(context);
      _userManager = new UserManager();
    }

    [HttpGet("")]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
      return Ok(await _booksService.GetBooks());
    }

    [Authorize]
    [HttpGet("user")]
    public async Task<ActionResult<IEnumerable<Book>>> GetUserBooks()
    {
      return Ok(await _booksService.GetUserBooks(_userManager.GetUserId(User)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBookById(int id)
    {
      return Ok(await _booksService.GetBookById(id));
    }

    [Authorize]
    [HttpPost("")]
    public async Task<ActionResult<Book>> PostBook(Book bookData)
    {
      return Ok(await _booksService.CreateBook(bookData, _userManager.GetUserId(User)));
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBook(int id, Book bookData)
    {
      return Ok(await _booksService.UpdateBook(bookData, _userManager.GetUserId(User)));
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<Book>> DeleteBookById(int id)
    {
      return Ok(await _booksService.DeleteBookById(id, _userManager.GetUserId(User)));
    }
  }
}