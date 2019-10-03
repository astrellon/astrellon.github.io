  // Add tooltips from alt attributes on images.
  var imgs = document.querySelectorAll('img');
  for (var i = 0; i < imgs.length; i++)
  {
    var img = imgs[i];
    if (img.hasAttribute('title'))
    {
      continue;
    }
    img.setAttribute('title', img.getAttribute('alt'));
  }