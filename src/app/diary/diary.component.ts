import { Component } from '@angular/core';
import { DiaryDataService } from '../shared/diary-data.component';
import { DiaryEntry } from '../shared/diary-entry.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.css'
})
export class DiaryComponent {

  diaryEntries!: DiaryEntry[];
  diarySubscription = new Subscription();
  constructor(private diaryDataService: DiaryDataService, private router: Router) {

  }
  ngOnInit(): void {
    this.diaryDataService.getDiaryEntries();
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe(diaryEntries => {
      this.diaryEntries = diaryEntries;
    });
    this.diaryEntries = this.diaryDataService.diaryEntries;
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  onDelete(index: string) {
    this.diaryDataService.onDelete(index);
  }

  onEdit(index: string) {
    this.router.navigate(["edit", index]);
  }
}
