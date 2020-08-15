{
  'use strict';

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    articleTagsSelector: '.post-tags .list',
    titleListSelector: '.titles',
    articleAuthorSelector: '.post-author',
    tagListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.list.authors'
  };

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


  const generateTitleLinks = function(customSelector = ''){
    console.log('customSelector: ' + customSelector);

    /* remove titleList content */
    document.querySelector(opt.titleListSelector).innerHTML = '';


    /* loop for every one article */
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    console.log('articles: ', articles);
    let html = '';
    for(let article of articles){

      /* read article id and save it in const */
      const articleId = article.getAttribute('id');
      console.log('articleId: ' + articleId);


      /* find title element and save in const */
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      console.log('articleTitle:' + articleTitle);


      /* make links html and save in const */
      const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle  + '</span></a></li>';
      console.log('linkHTML: ' + linkHTML);


      /* put created html into left column */
      html = html + linkHTML;
    }

    document.querySelector(opt.titleListSelector).innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links ', links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function(tags){
    /* creare params object*/
    let params = {max: 0, min: 999999};
    console.log('params ', params);


    /* START LOOP for params object*/
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');

      /* find max and min params for tags */
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);

    /* END LOOP for params object*/
    }

    return params;
  };

  const calculateTagClass = function(count,params){

    /* calculate class number */
    const classNumber = Math.floor((count - params.min)/(params.max - params.min ) * (opt.cloudClassCount - 1) + 1 );
    console.log('classNumber: ' + classNumber);

    /* create tag class */
    return opt.cloudClassPrefix + classNumber;

  };

  const generateTags = function(){

    /* create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    console.log('articles: ', articles);


    /* START LOOP: for every article: */
    for(let article of articles){
      console.log('article: ', article);

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(opt.articleTagsSelector);
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

        /* check if this link is NOT already in allTags */
        if(!allTags[tag]){

          /* add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }


      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      article.querySelector(opt.articleTagsSelector).innerHTML = html;

    /* END LOOP: for every article: */
    }

    /* find list of tags in right column */
    const tagList = document.querySelector(opt.tagListSelector);


    /* create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';


    /* START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
      allTagsHTML += tagLinkHTML;
      console.log('allTagsHTML:', allTagsHTML);

    /* END LOOP: for each tag in allTags: */
    }

    /* add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

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



  const generateAuthors = function(){

    /* create a new variable allAuthors with an empty array */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    console.log('articles: ', articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find authors wrapper */
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);
      console.log('authorWrapper: ', authorWrapper);


      /* get author from data-author attribute */
      const author = article.getAttribute('data-author');
      console.log('author: ' + author);

      /* check if this link is NOT already in allAuthors */
      if(!allAuthors[author]){

        /* add tag to allAuthors object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

      /* insert author to wrapper */
      authorWrapper.innerHTML = 'by <a href="#author-' + author + '">' + author + '</a>';
      console.log('authorWrapper2: ', authorWrapper);


      /* END LOOP: for every article: */
    }

    /* find list of authors in right column */
    const authorList = document.querySelector(opt.authorsListSelector);

    /* create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* START LOOP: for each tag in allTags: */
    for(let author in allAuthors){

      /* generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
      console.log('authorLinkHTML:', authorLinkHTML);
      allAuthorsHTML += authorLinkHTML;
      console.log('allAuthorsHTML:', allAuthorsHTML);

    /* END LOOP: for each tag in allTags: */
    }

    /* add HTML from allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;

  };

  generateAuthors();

  const authorClickHandler = function(event){

    /* prevent default action for this event */
    event.preventDefault();


    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement: ' + clickedElement);
    console.log('event: ', event);


    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href: ' + href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author: ' + author);


    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author"]');
    console.log('authorLinks: ' + authorLinks);


    /* START LOOP: for each active author link */
    for( let authorLink of authorLinks){

      /* remove class active */
      authorLink.classList.remove('active');


    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('hrefAuthorLinks: ' + hrefAuthorLinks);


    /* START LOOP: for each found author link */
    for(let hrefAuthorLink of hrefAuthorLinks){

      /* add class active */
      hrefAuthorLink.classList.add('active');


    /* END LOOP: for each found tag link */
    }


    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function(){
  /* find all links to authors */
    const allAuthorsLinks = document.querySelectorAll('a[href^="#author"]');
    console.log('allAuthorsLinks: ', allAuthorsLinks);


    /* START LOOP: for each link */
    for(let allAuthorsLink of allAuthorsLinks){

      /* add tagClickHandler as event listener for that link */
      allAuthorsLink.addEventListener('click', authorClickHandler);


    /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();


}
