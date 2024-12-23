import { pool } from '../helpers/db.js'
import { Router } from "express"
import dotenv from 'dotenv';
import { postLogin, postRegistration,getReviewsByUser,getShareInfo,putShareVisibility,getFavoritesByShareUrl,getAllPublicShares,deleteUser,getAccountInfo,getUserAvart,uploadUserAvatar,upload,editAccountInfo } from '../controllers/UserController.js'

dotenv.config()


const router = Router()

router.post('/register', postRegistration);
router.post('/login', postLogin);
router.delete('/delete', deleteUser);
router.patch('/:accountId/editaccount', editAccountInfo);
router.get('/:accountId/account',getAccountInfo)
router.get('/:accountId/avatar',getUserAvart)
router.post('/:accountId/uploadavatar', upload.single('image'), uploadUserAvatar);

//Reviews
router.get('/:accountId/reviews', getReviewsByUser);

//share section
// router.post('/share/:accountId/new', postNewShareUrl);
router.get('/shares', getAllPublicShares);
router.get('/share/:accountId', getShareInfo);
router.put('/share/:accountId/visibility', putShareVisibility);
router.get('/share/public/:shareUrl', getFavoritesByShareUrl);


// router.post('/register',(req,res,next) => {
//   hash(req.body.password,10,(error,hashedPassword) =>{
//     if (error) next (error)//hash error.
//       try {
//         pool.query('insert into account (email,password) values ($1,$2) returning *',[req.body.email,hashedPassword],(error,result) => {
//           if (error) return next (error) 
//           return res.status(201).json({id:result.rows[0].id, email:result.rows[0].email})
//         }
//         )
//       } catch (error) {
//         return next(error)
//       }
//   })
  
// })

// router.post('/login',(req,res,next) => {
//   const invalid_message = 'Invalid credentials.'
//   const invalid_messageNoMatch = 'Not match.'
//   try {
//     pool.query('select * from account where email=$1',[req.body.email],(error,result) => {
//       if (error) return next (error)
//       if (result.rowCount === 0) return next(new Error(invalid_message))
      
//       compare(req.body.password,result.rows[0].password,(error,match) =>{
//         if (error) return next (error)
//         if (!match) return next(new Error(invalid_messageNoMatch))

//         const token = sign({user:req.body.email},process.env.JWT_SECRET_KEY);
//         const user = result.rows[0];
//         return res.status(200).json(
//           {
//             'id': user.id,
//             'email': user.email,
//             'token': token
//           }
//         )
//       }) 
//     }) 
//   } catch (error) {
//     return next(error)
//   }
// })

export default router;