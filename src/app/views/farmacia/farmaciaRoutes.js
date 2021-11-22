import React from 'react'
import { authRoles } from '../../auth/authRoles'

const farmaciaRoutes = [
    {
        path: '/drugstore/list',
        component: React.lazy(() => import('./items')),
        //auth: authRoles.sa,
    }
]

export default farmaciaRoutes

