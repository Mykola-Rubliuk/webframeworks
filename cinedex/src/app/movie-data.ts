import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Movie } from './models/movie';

@Service()
export class MovieData {
  private http = inject(HttpClient);

  private apiBaseUrl =
    window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';

  public async getMovies(): Promise<Movie[]> {
    const url = `${this.apiBaseUrl}/movies`;
    return firstValueFrom(this.http.get<Movie[]>(url));
  }
}
