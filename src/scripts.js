// Add tooltips from alt attributes on images.
if (typeof(document.querySelectorAll) === 'function')
{
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

  var backgrounds = document.querySelectorAll('.background');
  var offset = -Math.random() * 60 + 's';
  for (var i = 0; i < backgrounds.length; i++)
  {
    backgrounds[i].style.animationDelay = offset;
  }
}