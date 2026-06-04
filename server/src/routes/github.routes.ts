import { Router } from 'express'
import { getProfile } from '../controllers/github.controller'

const router = Router()

router.get('/:username', getProfile)

export default router