using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using library.Infrastructure;
using library.Services.Books.Models;
using library.Services.Errors.Entities;
using library.Services.Users;
using Microsoft.EntityFrameworkCore;

namespace library.Services.Books
{
  public class BooksService
  {
    private ApplicationContext _db;

    public BooksService(ApplicationContext context)
    {
      _db = context;
    }

    public async Task<IEnumerable<Book>> GetBooks()
    {
      return await _db.Books.ToListAsync();
    }

    public async Task<IEnumerable<Book>> GetUserBooks(int? userId)
    {
      return await _db.Books.Where(book => book.OwnerId == userId && book.OwnerId != null).ToListAsync();
    }

    public async Task<Book> GetBookById(int id)
    {
      var book = await _db.Books.AsNoTracking().FirstOrDefaultAsync<Book>(book => book.Id == id);

      if (book == null)
      {
        throw new NotFoundException("Книга не найдена");
      }

      return book;
    }

    public async Task<Book> CreateBook(Book bookData, int? userId)
    {
      bookData.OwnerId = userId;

      await _db.Books.AddAsync(bookData);
      await _db.SaveChangesAsync();

      return bookData;
    }

    public async Task<Book> UpdateBook(Book model, int? userId)
    {
      var book = await GetBookById(model.Id);

      if (book.OwnerId != userId)
      {
        throw new ForbidException("Нет прав на редактирование книги");
      }

      _db.Books.Update(model);
      await _db.SaveChangesAsync();

      return model;
    }

    public async Task<Book> DeleteBookById(int id, int? userId)
    {
      var book = await GetBookById(id);

      if (book.OwnerId != userId)
      {
        throw new ForbidException("Нет прав на удаление книги");
      }

      _db.Books.Remove(book);
      await _db.SaveChangesAsync();

      return book;
    }
  }
}