export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    return body

    // throw createError({
    //     statusCode: 400,
    //     statusMessage: 'ID should be an integer',
    // })

    // setResponseStatus(event, 202)
    // return {
    //     hello: 'world'
    // }
})