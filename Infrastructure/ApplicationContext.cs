using Microsoft.EntityFrameworkCore;
using library.Models;

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