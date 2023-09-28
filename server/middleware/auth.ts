import * as jose from 'jose';


export default fromNodeMiddleware(async (req, res, next): Promise<void> => {
  //if (req.url?.includes('login') || req.url?.includes('register')) {
  next()
  // } else {
  //   let authHeader = req?.headers?.authorization;

  //   if (authHeader) {

  //     console.log(authHeader)

  //     let token = authHeader?.split(" ")[1]


  //     if (!token) {
  //       throw createError({
  //         statusCode: 401,
  //         statusMessage: 'Not Authenticated'
  //       })
  //     }
  //     next()
  //   }
  // }
})