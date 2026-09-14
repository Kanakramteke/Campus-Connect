const { z } = require('zod')

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  college: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  interests: z.any().optional(),
  profileImage: z.string().optional(),
  avatar: z.string().optional()
})

module.exports = {
  updateProfileSchema
}
