const { z } = require('zod')

const communitySchema = z.object({
  name: z.string().min(2, 'Community name is required'),
  category: z.string().optional().default('General'),
  college: z.string().optional(),
  description: z.string().min(5, 'Description is required'),
  image: z.string().optional(),
  interests: z.any().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('PUBLISHED')
})

const postSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  content: z.string().min(2, 'Content is required')
})

const commentSchema = z.object({
  content: z.string().min(1, 'Comment content cannot be empty')
})

module.exports = {
  communitySchema,
  postSchema,
  commentSchema
}
