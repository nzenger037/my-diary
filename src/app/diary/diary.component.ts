import { Component } from '@angular/core';
import { DiaryDataService } from '../shared/diary-data.component';
import { DiaryEntry } from '../shared/diary-entry.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent {

  diaryEntries: DiaryEntry[] | undefined;
  diarySubscription = new Subscription();
  constructor(private diaryDataService: DiaryDataService) {

  }
  ngOnInit(): void {
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe(diaryEntries => {
      this.diaryEntries = diaryEntries;
    });
    this.diaryEntries = this.diaryDataService.diaryEntries;
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  onDelete(index: number) {
    this.diaryDataService.onDelete(index);
  }
}
