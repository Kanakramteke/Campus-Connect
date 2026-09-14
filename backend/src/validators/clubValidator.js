const { z } = require('zod')

const clubSchema = z.object({
  name: z.string().min(2, 'Club name is required'),
  category: z.enum(['TECHNICAL', 'CULTURAL', 'OTHER']).optional().default('TECHNICAL'),
  college: z.string().optional(),
  description: z.string().min(5, 'Description is required'),
  image: z.string().optional(),
  activities: z.any().optional(),
  leadership: z.any().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('PUBLISHED')
})

module.exports = {
  clubSchema
}
