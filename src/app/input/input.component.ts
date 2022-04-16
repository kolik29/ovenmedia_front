import { Component, OnInit } from '@angular/core';
import { StreamInputService } from '../services/stream-input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  public cameraStreamEnabled: boolean = false;
  public screenStreamEnabled: boolean = false;
  
  public audioCameraEnabled: boolean = true;
  
  public videoCameraEnabled: boolean = true;
  
  public cameraStream: StreamInputService;
  public screenStream: StreamInputService;

  public streamId: string = '';

  constructor() {
    this.cameraStream = new StreamInputService('camera');
    this.screenStream = new StreamInputService('screen');

    this.streamId = this.getRandom();
  }

  async ngOnInit(): Promise<void> {
    this.cameraStream.init();
  }

  startCameraStream(): void {
    this.cameraStreamEnabled = !this.cameraStreamEnabled;
    
    if (this.cameraStreamEnabled) {
      this.cameraStream.start(this.streamId);
    } else {
      this.cameraStream.stop();
      this.cameraStream.init();
    }
  }

  async startScreenStream(): Promise<void> {
    this.screenStreamEnabled = !this.screenStreamEnabled;
    
    if (this.screenStreamEnabled) {
      await this.screenStream.init(true);
      this.screenStream.start(this.streamId + '_screen');
    } else {
      this.screenStream.stop();
    }
  }

  enableCameraAudio(): void {
    this.audioCameraEnabled = !this.audioCameraEnabled;
    this.cameraStream.enabledAudio(this.audioCameraEnabled);
  }

  enableCameraVideo(): void {
    this.videoCameraEnabled = !this.videoCameraEnabled;
    this.cameraStream.enabledVideo(this.videoCameraEnabled);
  }

  getRandom(): string  {
    return (Math.random() * (9999 - 1000) + 1000).toFixed().toString();
  }
}

