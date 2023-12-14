import 'dotenv/config'
import OpenAI from 'openai'
import logger from './logger.js'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function getMovieTitle(str)  {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ 
                role: 'system',
                content: `Extract a movie title from the following string: "${str}". Return the title with proper capitalization and remove unecessary punctuation such as quotations around the full title name. If you're familiar with a movie that is being unnecessarily abbreviated, return the full title.`,
            }],
            model: 'gpt-4'
        })
    
        const response = completion.choices[0].message.content
        return response
    } catch (error) {
        logger.error('Failed to extract movie title:', error)
        throw error
    }

}

export const gpt = { getMovieTitle }
