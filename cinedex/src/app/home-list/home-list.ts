import {Component, signal} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home-list',
  styleUrl: './home-list.css',
  templateUrl: './home-list.html',
})
export class HomeList {
// Define 'name' as a reactive Signal
  protected readonly name = signal('Costa cafe');
}
