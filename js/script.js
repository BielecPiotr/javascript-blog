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
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list',
    optTitleListSelector = '.titles';

  const generateTitleLinks = function(){

    /* remove titleList content */

    document.querySelector(optTitleListSelector).innerHTML = '';

    /* loop for every one article */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles: ', articles);

    let html = '';

    for(let article of articles){

      /* read article id and save it in const */

      const articleId = article.getAttribute('id');
      console.log('articleId: ' + articleId);

      /* find title element and save in const */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle:' + articleTitle);

      /* make links html and save in const */

      const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle  + '</span></a></li>';
      console.log('linkHTML: ' + linkHTML);

      /* put created html into left column */

      html = html + linkHTML;

    }

    document.querySelector(optTitleListSelector).innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links ', links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function(){
    /* find all articles */

    /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

    /* generate HTML of the link */

    /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  };

  generateTags();


}
