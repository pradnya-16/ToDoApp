var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS to allow frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS policy before any other middleware
app.UseCors("AllowAll");

// Existing weather forecast code (optional)
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

// TodoItems code
var todoItems = new List<TodoItem>
{
    new TodoItem { Title = "Learn C#", Description = "Learn C# and .NET", DueDate = DateTime.Now.AddDays(1), List = "Personal" },
    new TodoItem { Title = "Build a Web API", Description = "Build a Web API using ASP.NET Core", DueDate = DateTime.Now.AddDays(2), List = "Work" },
    new TodoItem { Title = "Build a Single Page Application", Description = "Build a Single Page Application using Angular or React", DueDate = DateTime.Now.AddDays(3), List = "Work" },
    new TodoItem { Title = "Setup CI/CD", Description = "Setup CI/CD using Azure DevOps", DueDate = DateTime.Now.AddDays(4), List = "Work" },
    new TodoItem { Title = "Write Unit Tests", Description = "Write unit tests for the API and SPA", DueDate = DateTime.Now.AddDays(5), List = "Work" },
    new TodoItem { Title = "Code Review", Description = "Perform code review for the API and SPA", DueDate = DateTime.Now.AddDays(6), List = "Work" },
    new TodoItem { Title = "Prepare for Interview", Description = "Prepare for technical interviews", DueDate = DateTime.Now.AddDays(7), List = "Personal" },
    new TodoItem { Title = "Take a Break", Description = "Take a break and enjoy the weekend", DueDate = DateTime.Now.AddDays(8), List = "Personal" },
    new TodoItem { Title = "Todo 1", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad", DueDate=DateTime.Now.AddDays(1)},
    new TodoItem { Title = "Todo 2", Description = "minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in", DueDate=DateTime.Now.AddDays(3)},
    new TodoItem { Title = "Todo 3", Description = "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in", DueDate=DateTime.Now.AddDays(5)},
    new TodoItem { Title = "Todo 4", Description = "culpa qui officia deserunt mollit anim id est laborum.", DueDate=DateTime.Now.AddDays(8) }
};

app.MapGet("/todos/{list?}", (string? list) =>
{
    var items = string.IsNullOrEmpty(list) ? todoItems : todoItems.Where(todo => todo.List == list).ToList();
    return Results.Ok(items);
});

app.MapPost("/todos", (TodoItem newTodo) =>
{
    todoItems.Add(newTodo);
    return Results.Created($"/todos/{newTodo.Title}", newTodo);
});

app.Run();

// Model definitions after app.Run()
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}


