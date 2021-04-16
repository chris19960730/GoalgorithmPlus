const { MongoClient, ObjectId } = require('mongodb');

// eslint-disable-next-line no-undef
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/';

module.exports = {
  addUser: async (user) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const users = db.collection('user');

      const x = await users.insertOne({
        username: user.username,
        email: user.email,
        password: user.password,
      });
      return x.insertedId;
    } finally {
      client.close();
    }
  },

  getUser: async (email) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const users = db.collection('user');
      const userFound = await users.findOne({
        email: email,
      });
      return userFound;
    } finally {
      client.close();
    }
  },
  getUserById: async (user_id) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const users = db.collection('user');
      const userFound = await users.findOne({
        _id: ObjectId(user_id),
      });
      return userFound;
    } finally {
      client.close();
    }
  },
  getArticles: async (start, itemPerPage, tagFilter, searchFilter) => {
    let filter =
      tagFilter === '' || tagFilter === undefined
        ? {}
        : { 'tags.name': tagFilter };

    if (searchFilter !== '' && searchFilter !== undefined) {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: searchFilter } },
          { description: { $regex: searchFilter } },
        ],
      };
    }
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const allArticles = await articles
        .find(filter)
        .skip(parseInt(start))
        .limit(parseInt(itemPerPage))
        .toArray();
      return allArticles;
    } finally {
      client.close();
    }
  },
  getUserArticles: async (
    start,
    itemPerPage,
    userId,
    tagFilter,
    searchFilter
  ) => {
    let filter =
      tagFilter === '' || tagFilter === undefined
        ? { user_id: userId }
        : { 'tags.name': tagFilter, user_id: userId };
    if (searchFilter !== '' && searchFilter !== undefined) {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: searchFilter } },
          { description: { $regex: searchFilter } },
        ],
      };
    }
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const userArticles = await articles
        .find(filter)
        .skip(parseInt(start))
        .limit(parseInt(itemPerPage))
        .toArray();
      return userArticles;
    } finally {
      client.close();
    }
  },
  getArticlesCount: async (tagFilter, searchFilter) => {
    let filter =
      tagFilter === '' || tagFilter === undefined
        ? {}
        : { 'tags.name': tagFilter };
    if (searchFilter !== '' && searchFilter !== undefined) {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: searchFilter } },
          { description: { $regex: searchFilter } },
        ],
      };
    }
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const count = await articles.find(filter).count();

      return count;
    } finally {
      client.close();
    }
  },
  getUserArticlesCount: async (userId, tagFilter, searchFilter) => {
    let filter =
      tagFilter === '' || tagFilter === undefined
        ? { user_id: userId }
        : { 'tags.name': tagFilter, user_id: userId };
    if (searchFilter !== '' && searchFilter !== undefined) {
      filter = {
        ...filter,
        $or: [
          { title: { $regex: searchFilter } },
          { description: { $regex: searchFilter } },
        ],
      };
    }
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const count = await articles.find(filter).count();

      return count;
    } finally {
      client.close();
    }
  },
  getUserUpvoteLists: async (userId, articleId) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const upvoteLists = db.collection('upvoteList');
      const res = await upvoteLists
        .find({ user_id: userId, article_id: articleId })
        .count();

      return res;
    } finally {
      client.close();
    }
  },
  addUpvoteRecord: async (userId, articleId) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const upvoteLists = db.collection('upvoteList');
      const x = await upvoteLists.insertOne({
        user_id: userId,
        article_id: articleId,
      });

      return x.insertedId;
    } finally {
      client.close();
    }
  },

  removeUpvoteRecord: async (userId, articleId) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const upvoteLists = db.collection('upvoteList');
      const x = await upvoteLists.deleteOne({
        user_id: userId,
        article_id: articleId,
      });

      return x;
    } finally {
      client.close();
    }
  },
  removeAllUpvoteRecord: async (articleId) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const upvoteLists = db.collection('upvoteList');
      const x = await upvoteLists.deleteMany({
        article_id: articleId,
      });

      return x;
    } finally {
      client.close();
    }
  },
  getArticleById: async (articleID) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      const articleFound = await articles.findOne({
        _id: ObjectId(articleID),
      });
      return articleFound;
    } finally {
      client.close();
    }
  },

  addArticle: async (article) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');

      const x = await articles.insertOne({
        title: article.title,
        tags: article.tags,
        description: article.description,
        content: article.content,
        votes: 0,
        user_id: article.user_id,
        user_name: article.user_name,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return x.insertedId;
    } finally {
      client.close();
    }
  },
  updateArticleVotes: async (article) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      await articles.updateOne(
        {
          _id: ObjectId(article._id),
        },
        {
          $set: {
            votes: article.votes,
          },
        }
      );
    } finally {
      client.close();
    }
  },

  updateArticle: async (article) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      await articles.updateOne(
        {
          _id: ObjectId(article._id),
        },
        {
          $set: {
            title: article.title,
            description: article.description,
            tags: article.tags,
            content: article.content,
            updated_at: new Date(),
          },
        }
      );
    } finally {
      client.close();
    }
  },
  removeArticle: async (articleId) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db('goalgorithm');
      const articles = db.collection('article');
      await articles.deleteOne({
        _id: ObjectId(articleId),
      });
    } finally {
      client.close();
    }
  },
};
