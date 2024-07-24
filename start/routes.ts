/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

router
  .get('/movies', async (ctx) => {
    return ctx.view.render('pages/movies', { movie: 'My Awesome Movie!' })
  })
  .as('movies.show')
