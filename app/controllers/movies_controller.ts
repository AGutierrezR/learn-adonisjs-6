import Movie from '#models/movie'
import MovieService from '#services/movie_service'
import type { HttpContext } from '@adonisjs/core/http'
import { toHtml } from '@dimerapp/markdown/utils'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const slugs = await MovieService.getSlugs()
    const movies: Movie[] = []

    for (const slug of slugs) {
      const md = await MovieService.read(slug)
      const movie = new Movie()

      movie.title = md.frontmatter.title
      movie.summary = md.frontmatter.summary
      movie.slug = slug

      movies.push(movie)
    }

    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    const md = await MovieService.read(params.slug)
    const movie = new Movie()

    movie.title = md.frontmatter.title
    movie.summary = md.frontmatter.summary
    movie.slug = params.slug
    movie.abstract = toHtml(md).contents

    return view.render('pages/movies/show', { movie })
  }
}
