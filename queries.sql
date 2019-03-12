\c knews_test;

SELECT articles.article_id, title, comment_id AS comment_number FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY title COUNT comment_id;
