# Заметки по приложению TodoApp

- angular
- .net
- pg

Разметка приложения
- mobirise

- при создании нового проекта можно сразу указать флаг пропуска генерации тестов --skip-tests

- Observable - это общее название потока
- Subject - это поток, который также может подписываться на другой поток
- BehaviorSubject - это Subject, который требует начальной инициализации

- есть также signals, которые являются альтернативой rxjs

- ```npm install @schematics/angular```

- в ts также можно создавать интерфейсы, репозитории, сервисы, observable

- еще один способ взаимодействия между компонентами: в appcomponent получать сервисы и раздавать данные другим компонентам через @Input и @Output. Это называются Smart и Dump компоненты.

# Медленные места:

- верстка, сетка, расположение на фронтенде на чистом css
- работа с реактивностью

# css

.fontsize{
    fontsize: 25px !important;
}

# deploy

- php hosting
- pages github
- в проекте поставить base= "./"
- для учебной практики: развертывать проект на stud.scc

# практика написания кода
- bootstrap через emet c grid

# locale 
для подключения в pipe локали ru надо подключить дополнительные пакеты

# ngx-color picker

# Ресурс для изучения
- learnrxjs

# intro
- для вступления и описания intro

# ng-sidebar
- боковое меню

# мобильная версия
- для определения типа устройства пользователя ```npx-device-detector```

# первичный конструктор

# проблемы c nuget

- по пути C:\Users\asv\AppData\Roaming\NuGet удалить конфиг nuget
- dotnet nuget locals all --clear
- перезагрузить

# работа с dotnet tool

- dotnet tool list