# Calculator

Sample calculator project that I made using Laravel, Vue and Electron.

## Tech Stack

1. Laravel 8
1. PHP 7.4
1. Vue 2

## Installation

1. Clone this repository.
1. After cloning the repository, run the following:

```
composer install
npm install
```

3. Create .env file from .env.example. Add the correct database credentials and other important details inside the .env file.
1. Run the following:

```
php artisan key:generate
php artisan migrate
npm run dev
```

5. You can also use `php artisan serve` to serve as a dev site. If you use php artisan serve, you can access the site through http://localhost:8000

## How to run tests

1. Run `npm run test`

## Common commands used in development

1. `npm run watch` - compiling CSS and JS using webpack
