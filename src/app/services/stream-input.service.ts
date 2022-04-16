import { Inject, Injectable } from '@angular/core';
import OvenLiveKit from 'ovenlivekit';

@Injectable({
  providedIn: 'root'
})
export class StreamInputService {
  private streamElementId: string = '';
  private userStream: any;
  private userMedia: any;

  constructor(@Inject(String) private stream_element: string) {
    this.streamElementId = stream_element;
  }

  public async init(screen: boolean = false): Promise<void> {
    this.userStream = OvenLiveKit.create();
    this.userStream.attachMedia(document.getElementById(this.streamElementId));

    if (screen)
      await this.userStream.getDisplayMedia({
        video: true,
        audio: true
      })
    else
      this.userMedia = await this.userStream.getUserMedia();
  }

  public start(stream_id: string, domain: string = 'wss://streamserver.uvvu.ru:3334'): void {
    this.userStream.startStreaming(domain + '/app/' + stream_id + '?direction=send&transport=tcp');
  }

  public async stop(): Promise<void> {
    this.userStream.remove();
  }

  public enabledAudio(enabled: boolean): void {
    this.userMedia.getAudioTracks()[0].enabled = enabled;
  }

  public enabledVideo(enabled: boolean): void {
    this.userMedia.getVideoTracks()[0].enabled = enabled;
  }
}
