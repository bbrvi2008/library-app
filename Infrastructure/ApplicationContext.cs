using Microsoft.EntityFrameworkCore;
using library.Services.Books.Models;
using library.Services.Users.Models;

namespace library.Infrastructure
{
  public class ApplicationContext : DbContext
  {
    public ApplicationContext() { }
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
  }
}