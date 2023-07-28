const dbConnection = require('../Config/Db');

async function CommentLike(req, res) {
  try {
    const { usersl, postno } = req.params;//postno is actually comment no
    const [postExist] = await dbConnection.query('SELECT * FROM comments WHERE slno = ?', [postno]);

    if (postExist.length > 0) {
      const [userMail] = await dbConnection.query('SELECT email FROM users WHERE slno = ?', [usersl]);
      const [inDislike] = await dbConnection.query('SELECT * FROM comment_dislike WHERE comment_slno = ? AND user_email = ?', [postno, userMail[0].email]);
      const [inlike] = await dbConnection.query('SELECT * FROM comment_like WHERE comment_slno = ? AND user_email = ?', [postno, userMail[0].email]);

      if (inDislike.length > 0) {
        await dbConnection.query('DELETE FROM comment_dislike WHERE comment_slno = ? AND user_email = ?', [postno, userMail[0].email]);
        await dbConnection.query('INSERT INTO comment_like (comment_slno, user_email) VALUES (?, ?)', [postno, userMail[0].email]);

        // Update like_amount and dislike_amount in the posts table
        const [like] = await dbConnection.query('SELECT like_amount FROM comments WHERE slno = ?', [postno]);
        const [dislike] = await dbConnection.query('SELECT dislike_amount FROM comments WHERE slno = ?', [postno]);

        await dbConnection.query('UPDATE comments SET like_amount = ?, dislike_amount = ? WHERE slno = ?', [like[0].like_amount + 1, dislike[0].dislike_amount - 1, postno]);

        // Insert notification (if needed)
        

        return res.status(200).json({
          message: 'Success'
        });
      } else if (inlike.length > 0) {
        return res.status(200).json({
          message: 'Failed'
        });
      } else {
        // If neither liked nor disliked, insert into post_like table and update like_amount
        await dbConnection.query('INSERT INTO comment_like (comment_slno, user_email) VALUES (?, ?)', [postno, userMail[0].email]);

        const [like] = await dbConnection.query('SELECT like_amount FROM comments WHERE slno = ?', [postno]);
        await dbConnection.query('UPDATE comments SET like_amount = ? WHERE slno = ?', [like[0].like_amount + 1, postno]);

        // Insert notification (if needed)
        

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

module.exports = CommentLike;