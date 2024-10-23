import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonProgressBar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { pause } from 'ionicons/icons';
import { Book } from '../models/Book';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonButtons,
    IonBackButton,
  ],
})
export class Tab2Page implements OnInit {
  receivedBook: Book = {
    idBook: 0,
    title: 'waiting',
    resume: 'waiting',
    coverURL: 'waiting',
    audioPath: 'waiting',
    maxPage: 0,
    author: 'waiting',
    chapters: [],
  };
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  audioSrc = 'assets/audio/VillagoisMinecraftTaPeur.mp3';
  isPlaying = false;
  currentTime = '0:00';
  duration = '0:00';
  progress = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msalService: MsalService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        this.receivedBook = JSON.parse(params['data']);
        console.log(this.receivedBook); // Affiche le livre passé
      }
    });
  }
  togglePlayPause() {
    const audio = this.audioPlayerRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  forward() {
    const audio = this.audioPlayerRef.nativeElement;
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  }

  rewind() {
    const audio = this.audioPlayerRef.nativeElement;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  }

  onMetadataLoaded() {
    const audio = this.audioPlayerRef.nativeElement;
    this.duration = this.formatTime(audio.duration);
  }

  onTimeUpdate() {
    const audio = this.audioPlayerRef.nativeElement;
    this.currentTime = this.formatTime(audio.currentTime);
    this.progress = audio.currentTime / audio.duration;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  goToHome() {
    this.router.navigate(['/']);
  }
  getUser() {
    const account = this.msalService.instance.getActiveAccount();
    console.log('User Info:', account);
  }
}
