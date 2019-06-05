import Plyr from 'plyr';

export interface PlyrDriverCreateParams {
  options: Plyr.Options;
  audioElement: HTMLAudioElement;
}

export interface PlyrDriverUpdateSourceParams {
  plyr: Plyr;
  source: Plyr.SourceInfo;
  audioElement: HTMLAudioElement;
}

export interface PlyrDriverDestroyParams {
  plyr: Plyr;
}

export interface PlyrDriver {
  create(params: PlyrDriverCreateParams): Plyr;
  updateSource(params: PlyrDriverUpdateSourceParams): void;
  destroy(params: PlyrDriverDestroyParams): void;
}
