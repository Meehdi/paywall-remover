export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.url) {
        throw createError({
            statusCode: 400,
            message: 'URL is required'
        })
    }

    try {
        // Fetch the content from the provided URL
        const response = await $fetch(body.url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ArchiveBot/1.0)',
            },
        })

        return {
            success: true,
            content: response,
            url: body.url,
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch URL content'
        })
    }
})
