const dbConnection = require('../Config/Db');

async function PostLike(req, res) {
  try {
    const { usersl, postno } = req.params;
    const [postExist] = await dbConnection.query('SELECT * FROM posts WHERE slno = ?', [postno]);

    if (postExist.length > 0) {
      const [userMail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?', [usersl]);
      const [inDislike] = await dbConnection.query('SELECT * FROM post_dislike WHERE post_slno = ? AND user_email = ?', [postno, userMail[0].email]);
      const [inlike] = await dbConnection.query('SELECT * FROM post_like WHERE post_slno = ? AND user_email = ?', [postno, userMail[0].email]);

      if (inDislike.length > 0) {
        await dbConnection.query('DELETE FROM post_dislike WHERE post_slno = ? AND user_email = ?', [postno, userMail[0].email]);
        await dbConnection.query('INSERT INTO post_like (post_slno, user_email) VALUES (?, ?)', [postno, userMail[0].email]);

        // Update like_amount and dislike_amount in the posts table
        const [like] = await dbConnection.query('SELECT like_amount FROM posts WHERE slno = ?', [postno]);
        const [dislike] = await dbConnection.query('SELECT dislike_amount FROM posts WHERE slno = ?', [postno]);

        await dbConnection.query('UPDATE posts SET like_amount = ?, dislike_amount = ? WHERE slno = ?', [like[0].like_amount + 1, dislike[0].dislike_amount - 1, postno]);

        // Insert notification (if needed)
        const [author] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?', [postno]);
        const [commenter] = await dbConnection.query('SELECT email FROM users WHERE slno = ?', [usersl]);
        if (author[0].user_slno != usersl) {
          await dbConnection.query('INSERT INTO notification (owner_slno, commenter_slno, commenter_email, reason, post_slno) VALUES (?, ?, ?, ?, ?)', [author[0].user_slno, usersl, commenter[0].email, 'Liked Your Post.', postno]);
        }

        return res.status(200).json({
          message: 'Success'
        });
      } else if (inlike.length > 0) {
        return res.status(200).json({
          message: 'Failed'
        });
      } else {
        // If neither liked nor disliked, insert into post_like table and update like_amount
        await dbConnection.query('INSERT INTO post_like (post_slno, user_email) VALUES (?, ?)', [postno, userMail[0].email]);

        const [like] = await dbConnection.query('SELECT like_amount FROM posts WHERE slno = ?', [postno]);
        await dbConnection.query('UPDATE posts SET like_amount = ? WHERE slno = ?', [like[0].like_amount + 1, postno]);

        // Insert notification (if needed)
        const [author] = await dbConnection.query('SELECT user_slno FROM posts WHERE slno = ?', [postno]);
        const [commenter] = await dbConnection.query('SELECT email FROM users WHERE slno = ?', [usersl]);
        if (author[0].user_slno != usersl) {
          await dbConnection.query('INSERT INTO notification (owner_slno, commenter_slno, commenter_email, reason, post_slno) VALUES (?, ?, ?, ?, ?)', [author[0].user_slno, usersl, commenter[0].email, 'Liked Your Post.', postno]);
        }

        return res.status(200).json({
          message: 'Success'
        });
      }
    } else {
      return res.status(404).json({
        message: 'Post not found'
      });
    }
  } catch (error) {
    console.error('Error executing PostLike:', error);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

module.exports = PostLike;