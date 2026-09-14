const { z } = require('zod')

const eventSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.enum(['TECHNICAL', 'CULTURAL'], { errorMap: () => ({ message: 'Category must be TECHNICAL or CULTURAL' }) }),
  tagline: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  venue: z.string().min(1, 'Venue is required'),
  registrationFee: z.number().nonnegative().optional().default(0),
  isFree: z.boolean().optional().default(true),
  seats: z.number().int().positive().optional().default(100),
  eligibility: z.string().optional(),
  organizedBy: z.string().optional(),
  college: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional().default('PUBLISHED'),
  whatToExpect: z.string().optional()
})

module.exports = {
  eventSchema
}
