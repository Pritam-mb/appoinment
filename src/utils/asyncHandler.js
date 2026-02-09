const asyncHandler =( func ) =>{ // asynchandler need a fuc that we provide through many page like user.controller.js
  return  (req,res,next)=>{
        Promise.resolve(func(req,res,next)).catch((error)=> next(error)) // next is used to pass the error to the next middleware
    }
}
// every async need try catch so we build this as a wrapper to avoid repetitive try catch in every async function..if promise resolve then func will be called otherwise catch will call next with error
export { asyncHandler};