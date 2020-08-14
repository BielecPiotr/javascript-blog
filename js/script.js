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

  const generateTitleLinks = function(customSelector = ''){
    console.log('customSelector: ' + customSelector);

    /* remove titleList content */
    document.querySelector(optTitleListSelector).innerHTML = '';


    /* loop for every one article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles: ', articles);


    /* START LOOP: for every article: */
    for(let article of articles){
      console.log('article: ', article);

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('tagsWrapeer: ', tagsWrapper);


      /* make html variable with empty string */
      let html = '';


      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags: ', articleTags);


      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray: ', articleTagsArray);


      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log('tag: ' + tag);

        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log('tagHTML: ' + tagHTML);


        /* add generated code to html variable */
        html = html + ' ' + tagHTML;
        console.log('html: ' + html);


      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      article.querySelector(optArticleTagsSelector).innerHTML = html;

    /* END LOOP: for every article: */
    }
  };

  generateTags();


  const tagClickHandler = function(event){

    /* prevent default action for this event */
    event.preventDefault();


    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement: ' + clickedElement);
    console.log('event: ', event);


    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href: ' + href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag: ' + tag);


    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag"]');
    console.log('tagLinks: ' + tagLinks);


    /* START LOOP: for each active tag link */
    for( let tagLink of tagLinks){

      /* remove class active */
      tagLink.classList.remove('active');


    /* END LOOP: for each active tag link */
    }


    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('hrefTagLinks: ' + hrefTagLinks);


    /* START LOOP: for each found tag link */
    for(let hrefTagLink of hrefTagLinks){

      /* add class active */
      hrefTagLink.classList.add('active');


    /* END LOOP: for each found tag link */
    }


    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function(){
  /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#tag"]');
    console.log('allTagsLinks: ', allTagsLinks);

    /* START LOOP: for each link */
    for(let allTagsLink of allTagsLinks){

      /* add tagClickHandler as event listener for that link */
      allTagsLink.addEventListener('click', tagClickHandler);


    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

}
