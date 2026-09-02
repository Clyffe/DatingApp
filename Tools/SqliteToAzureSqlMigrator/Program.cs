using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

if (args.Length != 2)
{
    Console.WriteLine("Usage: dotnet run -- <path-to-sqlite-db> <target-sql-server-connection-string>");
    return 1;
}

var sqlitePath = args[0];
var targetConnectionString = args[1];

var sourceOptions = new DbContextOptionsBuilder<DataContext>()
    .UseSqlite($"Data source={sqlitePath}")
    .Options;

var targetOptions = new DbContextOptionsBuilder<DataContext>()
    .UseSqlServer(targetConnectionString)
    .Options;

using var sourceCtx = new DataContext(sourceOptions);
using var targetCtx = new DataContext(targetOptions);

Console.WriteLine("Reading source data from SQLite...");
var users = await sourceCtx.Users
    .AsNoTracking()
    .Include(u => u.Member)
    .ThenInclude(m => m.Photos)
    .ToListAsync();

var usersMissingMember = users.Where(u => u.Member is null).ToList();
if (usersMissingMember.Count > 0)
{
    Console.WriteLine($"WARNING: {usersMissingMember.Count} user(s) have no Member row in the source database and will be skipped:");
    foreach (var u in usersMissingMember)
    {
        Console.WriteLine($"  - Id={u.Id}, UserName={u.UserName}");
    }
}
var validUsers = users.Where(u => u.Member is not null).ToList();

Console.WriteLine($"Migrating {validUsers.Count} users, {validUsers.Sum(u => u.Member.Photos.Count)} photos.");

// Photos have an identity column on SQL Server; insert them in a second pass
// with IDENTITY_INSERT so original IDs (and any references to them) survive.
var allPhotos = new List<Photo>();
foreach (var user in validUsers)
{
    allPhotos.AddRange(user.Member.Photos);
    user.Member.Photos = [];
}

Console.WriteLine("Inserting Users and Members into target database...");
targetCtx.Users.AddRange(validUsers);
await targetCtx.SaveChangesAsync();

Console.WriteLine("Inserting Photos into target database (preserving original IDs)...");
await targetCtx.Database.OpenConnectionAsync();
try
{
    await targetCtx.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Photos ON");
    targetCtx.Photos.AddRange(allPhotos);
    await targetCtx.SaveChangesAsync();
    await targetCtx.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Photos OFF");
}
finally
{
    await targetCtx.Database.CloseConnectionAsync();
}

Console.WriteLine("Done.");
Console.WriteLine($"Target now has {await targetCtx.Users.CountAsync()} users, " +
    $"{await targetCtx.Members.CountAsync()} members, {await targetCtx.Photos.CountAsync()} photos.");

return 0;
