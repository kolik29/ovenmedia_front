import { Component, OnInit } from '@angular/core';
import { StreamOutputService } from '../services/stream-output.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.sass']
})
export class OutputComponent implements OnInit {
  public cameraStream: any;
  public screenStream: any;

  public streamId: string = '';

  public cameraStreamHide: boolean = true;
  public screenStreamHide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public streamConnect(): void {
    this.initCameraStream();
    this.initScreenStream();
  }

  private initCameraStream(): void {
    this.cameraStream = new StreamOutputService();
    this.cameraStream.init('cameraPlayer', this.streamId);

    this.cameraStream.ovenPlayer.on('stateChanged', (): void => {
      console.log(this.cameraStream.ovenPlayer.getState());

      if (this.cameraStream.ovenPlayer.getState() == 'error') {
        setTimeout(() => {
          this.initCameraStream();
        }, 1500);

        this.cameraStreamHide = true;
      } else
        this.cameraStreamHide = false;
    })
  }

  private initScreenStream(): void {
    this.screenStream = new StreamOutputService();
    this.screenStream.init('screenPlayer', this.streamId + '_screen');

    this.screenStream.ovenPlayer.on('stateChanged', (): void => {
      console.log(this.screenStream.ovenPlayer.getState());

      if (this.screenStream.ovenPlayer.getState() == 'error') {
        setTimeout(() => {
          this.initScreenStream();
        }, 1500);
        
        this.screenStreamHide = true;
      } else
        this.screenStreamHide = false;
    })
  }

}
