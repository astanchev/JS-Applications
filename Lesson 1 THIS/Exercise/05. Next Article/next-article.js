function getArticleGenerator(articles) {
    const content = document.getElementById("content");

    let count = 0;

    return function () {
        if (count < articles.length) {
            const article = document.createElement("article");
            article.textContent = articles[count];
            content.appendChild(article);
            count++;
        }
    }
}
