'use strict';

function postAudio(args) {
  const src = args[0].trim();
  return `<div class="audio"><audio controls preload><source src='${src}' type='audio/mp3'></audio></div>`;
}

function postVideo(args) {
  const src = args[0].trim();
  return `<div class="video"><video controls preload id="m3u8video"></video></div><script>var hls = new Hls();var video = document.getElementById('m3u8video');hls.loadSource('${src}');hls.attachMedia(video);</script>`;
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
