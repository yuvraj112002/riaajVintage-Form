<iframe
  id="rvForm"
  src="https://riaaj-vintage-form.vercel.app"
  title="Riaaj Vintage Form"
  style="width:100%; border:0; display:block; height:100%"
  allow="microphone; camera; autoplay; clipboard-write; fullscreen"
  allowfullscreen
></iframe>

<script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.5.5"></script>
<script>
  iframeResize({
      license: 'GPLv3',
    checkOrigin: false,
    heightCalculationMethod: 'bodyScroll',
    sizeWidth: true,
      direction: 'vertical',  // v5 way to say “resize height”
  }, '#rvForm');
</script>