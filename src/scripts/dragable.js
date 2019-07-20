var article = document.querySelector('.content');

article.addEventListener('mousedown', function(e) {
  article = e.target;
  console.log(article);
  var screenWidth = window.innerWidth;

  var coordinates = {
    x: e.clientX,
    y: e.clientY,
  };

  var onArticleMouseUp = function() {
    document.removeEventListener('mousemove', onArticleMouseMove);
    document.removeEventListener('mouseup', onArticleMouseUp);
  };

  var onArticleMouseMove = function(e) {
    var articleX = article.offsetLeft;
    var articleY = article.offsetTop;

    coordinates = {
      x: e.clientX,
      y: e.clientY,
    };

    article.style.left = (coordinates.x / screenWidth) * 100 + '%';
    article.style.top = coordinates.y + 'px';
    article.style.zIndex = 1000;
  };

  document.addEventListener('mousemove', onArticleMouseMove);
  document.addEventListener('mouseup', onArticleMouseUp);
});
