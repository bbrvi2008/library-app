using library.Services.Users.Models;

namespace library.Services.Books.Models
{
  public class Book
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public int Year { get; set; }
    public string Genre { get; set; }
    public string Author { get; set; }
    public int? OwnerId { get; set; }
    public User Owner { get; set; }
  }
}