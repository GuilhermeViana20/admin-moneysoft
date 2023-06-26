export default [
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Index.vue'),
      },
      {
        path: '/pages/blank',
        name: 'Blank',
        component: () => import('@/views/pages/Blank.vue'),
      },
      {
        path: '/pages/transactions',
        name: 'Transactions',
        component: () => import('@/views/pages/Transactions.vue'),
      },
      {
        path: '/pages/add/transaction',
        name: 'AddTransaction',
        component: () => import('@/views/pages/AddTransaction.vue'),
      },
      {
        path: '/pages/edit/transaction',
        name: 'EditTransaction',
        component: () => import('@/views/pages/EditTransaction.vue'),
      },
      {
        path: '/pages/payments',
        name: 'Payments',
        component: () => import('@/views/pages/Payments.vue'),
      },
      {
        path: '/pages/add/payment',
        name: 'AddPayment',
        component: () => import('@/views/pages/AddPayment.vue'),
      },
      {
        path: '/pages/cards',
        name: 'Cards',
        component: () => import('@/views/pages/Cards.vue'),
      },
      {
        path: '/pages/brands',
        name: 'Brands',
        component: () => import('@/views/pages/Brands.vue'),
      },
      {
        path: '/pages/categories',
        name: 'Categories',
        component: () => import('@/views/pages/Categories.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/layouts/AuthenticationLayout.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
      },
      {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
      },
      {
        path: '/auth/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
      },
      {
        path: '/auth/reset-password',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword.vue'),
      },
      {
        path: '/auth/confirm-password',
        name: 'ConfirmPassword',
        component: () => import('@/views/auth/ConfirmPassword.vue'),
      },
      {
        path: '/auth/verify-email',
        name: 'VerifyEmail',
        component: () => import('@/views/auth/VerifyEmail.vue'),
      },
    ],
  },
]
