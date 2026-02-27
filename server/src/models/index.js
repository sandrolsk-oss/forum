import User from './User.js';
import Topic from './Topic.js';
import Post from './Post.js';

// User -> Topics (A user can create many topics)
User.hasMany(Topic, { foreignKey: 'user_id', as: 'topics' });
Topic.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

// User -> Posts (A user can create many posts)
User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

// Topic -> Posts (A topic can have many posts)
Topic.hasMany(Post, { foreignKey: 'topic_id', as: 'posts', onDelete: 'CASCADE' });
Post.belongsTo(Topic, { foreignKey: 'topic_id' });

export { User, Topic, Post };
