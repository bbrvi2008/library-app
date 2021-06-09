Создание БД https://metanit.com/sharp/entityframeworkcore/7.1.php

Миграции в консоли
Если разработка осуществляется не в Visual Studio, то для миграций мы можем выполнять соответствующие команды в консоли. Для создания миграции:

dotnet ef migrations add InitialCreate
Для выполнения миграции:

dotnet ef database update

Добавление пакета:
dotnet add package Microsoft.EntityFrameworkCore.Tools