import { Injectable } from "@angular/core";
import { DiaryEntry } from "./diary-entry.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class DiaryDataService {

    diarySubject = new Subject<DiaryEntry[]>();
    diaryEntries: DiaryEntry[] = [
        new DiaryEntry("Jan 1st", "Entry 1"),
        new DiaryEntry("Jan 2nd", "Hello World"),
        new DiaryEntry("Dec 25th", "Happy Holidays!")
    ]

    onDelete(index: number) {
        this.diaryEntries.splice(index, 1);
        this.diarySubject.next(this.diaryEntries);
    }
}