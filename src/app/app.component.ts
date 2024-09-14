import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiaryComponent } from '../app/diary/diary.component'
import { HeaderComponent } from '../app/header/header.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DiaryComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-diary';
}
