import React from 'react'
import { authRoles } from '../../auth/authRoles'

const reclamosRoutes = [
    {
        path: '/complaints/list',
        component: React.lazy(() => import('./Reclamos')),
        //auth: authRoles.sa,
    }
]

export default reclamosRoutes

