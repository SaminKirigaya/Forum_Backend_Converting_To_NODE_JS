require('dotenv').config();
const express = require('express');
const router = express.Router();

const Authentication = require('../middleware/Authentication');
const registrationHandle = require('../RoutFunction/registration');
const upload = require('../Config/Multer');
const { v4: uuidv4 } = require('uuid');
const loginHandler = require('../RoutFunction/LoginFunction');
const AmILogged = require('../RoutFunction/AmILogged');
const PostTypes = require('../RoutFunction/PostTypes');
const HomePost = require('../RoutFunction/HomePost');
const Logout = require('../RoutFunction/Logout');
const Profile = require('../RoutFunction/Profile');
const MyPost = require('../RoutFunction/MyPost');
const ChangeProfileSub = require('../RoutFunction/ChangeProfileSub');
const ChangePass = require('../RoutFunction/ChangePass');
const DeleteID = require('../RoutFunction/DeleteID');
const Post = require('../RoutFunction/Post');
const TopicPost = require('../RoutFunction/TopicPost');
const SearchPost = require('../RoutFunction/SearchPost');
const Solve = require('../RoutFunction/Solve');
const IEntered = require('../RoutFunction/IEntered');
const MyPostEdit = require('../RoutFunction/MyPostEdit');
const PostEditSub = require('../RoutFunction/PostEditSub');
const MyPostDelete = require('../RoutFunction/MyPostDelete');
const Comment = require('../RoutFunction/Comment');
const MyCommentedPost = require('../RoutFunction/MyCommentedPost');
const PostLike = require('../RoutFunction/PostLike');
const PostDislike = require('../RoutFunction/PostDislike');
const CommentLike = require('../RoutFunction/CommentLike');
const CommentDislike = require('../RoutFunction/CommentDislike');
const MyPostComDel = require('../RoutFunction/MyPostComDel');
const DelMyCom = require('../RoutFunction/DelMyCom');
const AdminDelComs = require('../RoutFunction/AdminDelComs');
const Report = require('../RoutFunction/Report');
const Notification = require('../RoutFunction/Notification');
const DelNotification = require('../RoutFunction/DelNotification');
const SeeOther = require('../RoutFunction/SeeOther');
const SendMail = require('../RoutFunction/SendMail')


//remove later .....................................



// First Regs Route
router.post(
  '/regs',
  upload.single('images'), // Use multer middleware for handling the 'images' file
  registrationHandle
);

//Login Rout
router.post('/login',
  loginHandler
)

//Strtup Login Check
router.get('/amilogged/:token',
  AmILogged
)

//PostTypes 
router.get('/postTypes',
  PostTypes
)

//HomePost
router.get('/homepost',
HomePost
)

//Logout 
router.get('/logout/:usersl',
Authentication,
Logout
)

//Profile
router.get('/profile/:usersl',
Authentication,
Profile)

//Mypost in Profile
router.get('/mypost/:usersl',
Authentication,
MyPost)

//Change Profile Submit button
router.post('/changeprofilesub/:usersl',
Authentication,
upload.single('images'),
ChangeProfileSub)

//Change Pass in Profile
router.post('/changepasssub/:usersl',
Authentication,
ChangePass
)

//DELETE ACCOUNT 
router.get('/delete',
DeleteID
)

//Post 
router.post('/post/:usersl',
Authentication,
Post
)

//getting Post of Same Topics
router.get('/topic/:codename',
TopicPost
)

//Getting Post of Same Search 
router.get('/searchpost/:usersl/:searchdata',
Authentication,
SearchPost
)

//Solving Page 
router.get('/solve/:usersl/:probsl',
Authentication,
Solve)

//Adding view 
router.get('/ientered/:usersl/:postno',
Authentication,
IEntered)

//Post Edit 
router.get('/mypostedit/:usersl/:postno',
Authentication,
MyPostEdit
)

//Post Edit btn click
router.post('/myposteditsub/:usersl/:postno',
Authentication,
PostEditSub
)

//Delete Own post
router.get('/mypostdelete/:usersl/:postno',
Authentication,
MyPostDelete
)

//Submit Comment 
router.post('/comment/:usersl/:postno',
Authentication,
Comment
)

//My commented posts 
router.get('/mycommentedPost/:usersl',
Authentication,
MyCommentedPost
)

//Post Like 
router.get('/postlike/:usersl/:postno',
Authentication,
PostLike
)

//Post DisLike 
router.get('/postdislike/:usersl/:postno',
Authentication,
PostDislike
)

//Comment Like
router.get('/comlike/:usersl/:postno',
Authentication,
CommentLike
) // postno means comment no

//Comment Like
router.get('/comdislike/:usersl/:postno',
Authentication,
CommentDislike
) // postno means comment no


//Own com delete
router.get('/mypostcomdel/:usersl/:comntno',
Authentication,
MyPostComDel
)


//own coms delete bug fix 
router.get('/delmycom/:usersl/:comno',
Authentication,
DelMyCom
)

//Own post all coms delete authority
router.get('/admindeletecoms/:usersl/:postno/:comno',
Authentication,
AdminDelComs
)

//report 
router.get('/report/:usersl/:postno',
Authentication,
Report
)

//show notif
router.get('/notification/:usersl',
Authentication,
Notification
)

//del notification
router.get('/delnotif/:usersl/:highestsl',
Authentication,
DelNotification
)

//see other users
router.get('/seeother/:usersl/:mail',
Authentication,
SeeOther
)

//send mail to change pass
router.post('/forgotpass',
SendMail)




module.exports = router;
