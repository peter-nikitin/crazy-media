/* eslint-disable func-names */
/* eslint-disable no-console */
let prevHeight = 0;
let prevLeft = 0;
const windowWidth = $(window).width();

const articles = $('.content__article');

articles.each(function(index) {
  if (prevHeight === 0) {
    this.style.left = '5%';
  } else {
    this.style.left = `${(index / articles.length) * 100}%`;
  }
  const topPost = Math.floor(Math.random() * 100);

  this.style.top = `${topPost}%`;
  prevLeft = this.style.left;
  prevHeight = $(this).height();
  console.log(prevLeft);
  console.log(prevHeight);
});
