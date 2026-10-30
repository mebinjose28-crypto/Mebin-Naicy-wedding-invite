import { createFileRoute } from '@tanstack/react-router'

import { Invitation } from '@/components/invitation/Invitation'

export const Route = createFileRoute('/')({
  component: Invitation,
})
