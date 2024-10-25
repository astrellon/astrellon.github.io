#include "ripples.js"

// Add tooltips from alt attributes on images.
if (typeof (document.querySelectorAll) === 'function')
{
    const imgs = document.querySelectorAll('img');
    for (let i = 0; i < imgs.length; i++)
    {
        var img = imgs[i];
        if (img.hasAttribute('title'))
        {
            continue;
        }
        img.setAttribute('title', img.getAttribute('alt'));
    }

    const backgrounds = document.querySelectorAll('.background');
    const offset = -Math.random() * 60 + 's';
    for (let i = 0; i < backgrounds.length; i++)
    {
        (backgrounds[i]).style.animationDelay = offset;
    }
}

const canvas = document.getElementById('ripplesCanvas');
if (canvas != null)
{
    const ripples = new Ripples(canvas, 512);
}