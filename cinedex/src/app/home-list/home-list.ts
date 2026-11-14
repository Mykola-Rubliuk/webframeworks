import { Component, OnInit, inject, signal } from '@angular/core';
import { Movie } from '../models/movie';
import { DurationPipe } from '../duration-pipe';
import { MovieData } from '../movie-data';

@Component({
  imports: [DurationPipe],
  selector: 'app-home-list',
  styleUrl: './home-list.css',
  templateUrl: './home-list.html',
})
export class HomeList implements OnInit {
  private movieData = inject(MovieData);

  // Пока данных нет, список пустой
  movies = signal<Movie[]>([]);

  private async getMovies(): Promise<void> {
    try {
      this.movies.set(await this.movieData.getMovies());
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  ngOnInit(): void {
    this.getMovies();
  }
}
