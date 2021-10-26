import React from 'react'
import { authRoles } from '../../auth/authRoles'

const systemRoutes = [
    {
        path: '/system/config',
        component: React.lazy(() => import('./Config')),
        //auth: authRoles.sa,
    }
]

export default systemRoutes

