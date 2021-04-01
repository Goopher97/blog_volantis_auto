'use strict';

function postAudio(args) {
  const src = args[0].trim();
  return `<div class="audio"><audio controls preload><source src='${src}' type='audio/mp3'>Your browser does not support the audio tag.</audio></div>`;
}

function postVideo(args) {
  const src = args[0].trim();
  return `<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script><video id="video" controls loop="false" width="100%"></video>
<script>
  var video = document.getElementById('video');
  if(Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource('${src}');
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
});
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = '${src}';
  video.addEventListener('loadedmetadata',function() {
});
}
</script>`;
}

function postVideos(args, content) {
  args = args.join(' ').split(',');
  var cls = args[0];
  if (cls.length > 0) {
    cls = ' ' + cls;
  }
  var col = Number(args[1]) || 0;
  if (col > 0) {
    return `<div class="videos${cls}" col='${col}'>${content}</div>`;
  }
  return `<div class="videos${cls}">${content}</div>`;

}

hexo.extend.tag.register('audio', postAudio);
hexo.extend.tag.register('video', postVideo);
hexo.extend.tag.register('videos', postVideos, {ends: true});
