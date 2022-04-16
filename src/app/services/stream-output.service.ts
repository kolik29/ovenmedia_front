import { Injectable } from '@angular/core';
import OvenPlayer from 'ovenplayer';

@Injectable({
  providedIn: 'root'
})
export class StreamOutputService {
  public ovenPlayer: any;

  constructor() { }

  public init(player_id: string, stream_id: string, domain: string = 'wss://streamserver.uvvu.ru:3334'): void {
    this.ovenPlayer = OvenPlayer.create(player_id, {
      sources: [
        {
            label: 'original',
            type: 'webrtc',
            file: domain + '/app/' + stream_id
        }
      ],
      autoStart: true,
      playbackRate: false
    });
  }
}
