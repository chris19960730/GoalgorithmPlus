const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const goalgorithmDB = require('../model/myDB');

router.post('/register', async (req, res) => {
  const user = req.body;
  const hash = await bcrypt.hash(user.password, 10);
  const new_user = {
    ...user,
    password: hash,
  };
  try {
    const userId = await goalgorithmDB.addUser(new_user);
    res.send({ status: true, user_id: userId });
  } catch {
    res.send({
      status: false,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await goalgorithmDB.getUser(email);
    if (!user) {
      res.send({
        status: false,
      });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.send({ status: 'verified', user_id: user._id });
    } else {
      res.send({
        status: 'notMatch',
      });
    }
  } catch {
    res.send({
      status: false,
    });
  }
});

router.get('/currentUser', async (req, res) => {
  const { id } = req.query;
  try {
    const user = await goalgorithmDB.getUserById(id);
    res.json(user);
  } catch (err) {
    res.send(err);
  }
});

router.post('/checkEmail', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await goalgorithmDB.getUser(email);
    if (!user) {
      res.send({
        exist: false,
      });
    } else {
      res.send({
        exist: true,
      });
    }
  } catch (err) {
    res.send(err);
  }
});

router.get('/allArticles', async (req, res) => {
  const { start, itemPerPage, tagFilter, searchFilter } = req.query;
  try {
    const articles = await goalgorithmDB.getArticles(
      start,
      itemPerPage,
      tagFilter,
      searchFilter
    );
    res.json(articles);
  } catch (err) {
    console.log('something wtong');
    res.send(err);
  }
});

router.get('/myArticles', async (req, res) => {
  const { start, itemPerPage, userId, tagFilter, searchFilter } = req.query;
  try {
    const articles = await goalgorithmDB.getUserArticles(
      start,
      itemPerPage,
      userId,
      tagFilter,
      searchFilter
    );
    res.json(articles);
  } catch (err) {
    console.log('something wrong');
    res.send(err);
  }
});

router.get('/articlesCount', async (req, res) => {
  const { tagFilter, searchFilter } = req.query;
  try {
    const count = await goalgorithmDB.getArticlesCount(tagFilter, searchFilter);
    res.json(count);
  } catch (err) {
    res.send(err);
  }
});

router.get('/myArticlesCount', async (req, res) => {
  const { userId, tagFilter, searchFilter } = req.query;
  try {
    const count = await goalgorithmDB.getUserArticlesCount(
      userId,
      tagFilter,
      searchFilter
    );

    res.json(count);
  } catch (err) {
    res.send(err);
  }
});

router.get('/articles/:id', async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await goalgorithmDB.getArticleById(articleId);
    res.json(article);
  } catch (err) {
    res.send(err);
  }
});

router.post('/articles/new', async (req, res) => {
  const newArticle = req.body;
  try {
    const articleId = await goalgorithmDB.addArticle(newArticle);
    res.send({ status: true, articleId: articleId });
  } catch {
    res.send({
      status: false,
    });
  }
});

router.post('/updateArticleVotes', async (req, res) => {
  const newArticle = req.body;

  try {
    await goalgorithmDB.updateArticleVotes(newArticle);
    res.send({ status: true });
  } catch (err) {
    res.send(err);
  }
});

router.post('/updateArticle', async (req, res) => {
  const newArticle = req.body;

  try {
    await goalgorithmDB.updateArticle(newArticle);
    res.send({ status: true });
  } catch (err) {
    res.send(err);
  }
});

router.post('/deleteOneArticle', async (req, res) => {
  const { articleId } = req.body;

  try {
    await goalgorithmDB.removeArticle(articleId);
    await goalgorithmDB.removeAllUpvoteRecord(articleId);
    res.send({ status: true });
  } catch (err) {
    res.send(err);
  }
});

router.get('/upvoteLists', async (req, res) => {
  const { userId, articleId } = req.query;

  try {
    const found = await goalgorithmDB.getUserUpvoteLists(userId, articleId);
    if (found) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  } catch (err) {
    res.send(err);
  }
});

router.post('/removeUpvoteLists', async (req, res) => {
  const { userId, articleId } = req.body;

  try {
    await goalgorithmDB.removeUpvoteRecord(userId, articleId);
    res.send({ status: true });
  } catch (err) {
    res.send(err);
  }
});
router.post('/upvoteLists', async (req, res) => {
  const { userId, articleId } = req.body;

  try {
    await goalgorithmDB.addUpvoteRecord(userId, articleId);
    res.send({ status: true });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
