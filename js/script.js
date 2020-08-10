{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event: ', event);

      /* [DONE] remove class 'active' from all article links  */

      const activeLinks = document.querySelectorAll('.titles a.active');

      for(let activeLink of activeLinks){
          activeLink.classList.remove('active');
      }

      /* [DONE] add class 'active' to the clicked link */

      console.log('clickedElement: ', clickedElement);
      console.log('clickedElement with plus: ' + clickedElement);

      clickedElement.classList.add('active');

      /* [DONE] remove class 'active' from all articles */

      const activeArticles = document.querySelectorAll('.posts article.active');

      for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
      }

      /* get 'href' attribute from the clicked link */

      const hrefFromLink = clickedElement.getAttribute('href');
      console.log('hrefFromLink: ', hrefFromLink);

      /* find the correct article using the selector (value of 'href' attribute) */

      const clickedArticle = document.querySelector(hrefFromLink);
      console.log('clickedArticle: ', clickedArticle);

      /* add class 'active' to the correct article */

      clickedArticle.classList.add('active');

      console.log('clickedarticleafter: ', clickedArticle);
    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  const generateTitleLinks = function(){

    /* remove titleList content */

    document.querySelector('.titles').innerHTML = '';

    /* loop for every one article */

      /* read article id and save it in const */

      /* find title element and save in const */

      /* make links html and save in const */

      /* put created html into left column */
  }

  generateTitleLinks();

}