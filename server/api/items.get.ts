export default defineEventHandler((event) => {

    const query = getQuery(event)
    
    return {
        hello: 'world'
    }
})