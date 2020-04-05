using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace React_vs_example.Models
{
    public class TodosDBContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-GI09NC4;Initial Catalog=TodoApp;Integrated Security=True");
        }
    }
}
