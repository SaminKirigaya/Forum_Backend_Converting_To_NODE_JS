# Forum_Backend_Converting_To_NODE_JS
The forum that we created for client with Laravel is converted to Node js according to all routes for Node Js demonstration.

## Features Updated

- Account Customization
- Changing Password With Authentication Via Mail
- Hashed System
- Post Like Dislike & Comment Like Dislike
- Client Images Are Converted Before Saving With Intervention Image.
- All Api Are Currently Working Fine With Our Frontend Project of React Js.
- Viewing all user and their posts personally.
- 
## Run Locally 

PORT = 8000
Imgpath = http://localhost:8000
Host = localhost
User = root
Pass = 
DB = forum

SMTP_MAIL = 
SMTP_PASS = 

change this datas according to your server configuration.

## Optimizations

Added more responsive view for different displays.
Made carousel effect optimized with respect to the device dislay change.


## All Routes 
------------------------------------------------------------------------------------------------
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


