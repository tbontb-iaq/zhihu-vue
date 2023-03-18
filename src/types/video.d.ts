interface ZVideoDefinition {
  watermarked: 0;
  maxbitrate: number;
  format: "mp4";
  height: number;
  channels: 2;
  duration: number;
  size: number;
  play_url: string;
  bitrate: number;
  width: number;
  sample_rate: number;
  fps: number;
}

interface ZVideoPlaylist {
  FHD?: ZVideoDefinition;
  LD?: ZVideoDefinition;
  HD?: ZVideoDefinition;
  SD?: ZVideoDefinition;
}

interface ZVideo {
  title: null;
  watermarked: 0;
  cover_url: string;
  playlist: ZVideoPlaylist;
  playlist_v2: ZVideoPlaylist;
}
