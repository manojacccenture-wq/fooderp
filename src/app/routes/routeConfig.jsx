import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { MenuPage } from '../../features/Menu/pages/MenuPage';
import { DineInPage } from '../../features/DineIn/pages/DineInPage';
import { TakeawayPage } from '../../features/Takeaway/pages/TakeawayPage';
import { ItemOnOffPage } from '../../features/Inventory/pages/ItemOnOff/ItemOnOffPage';
import { MoneyManagementPage } from '../../features/Cashier/pages/MoneyManagement/MoneyManagementPage';
import { OrderHistoryPage } from '../../features/Orders/pages/OrderHistoryPage';
import { OrderHistoryDetailsPage } from '../../features/Orders/pages/OrderHistoryDetailsPage';
import { ShiftSummaryPage } from '../../features/Cashier/pages/ShiftSummary/ShiftSummaryPage';
import { LoginPage } from '../../features/Auth/pages/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard/menu" replace />,
  },
  {
    path: '/dashboard/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <Navigate to="menu" replace />,
          },
          {
            path: 'menu',
            element: <MenuPage />,
          },
          {
            path: 'dine-in',
            element: <DineInPage />,
          },
          {
            path: 'item-on-off',
            element: <ItemOnOffPage />,
          },
          {
            path: 'money-management',
            element: <MoneyManagementPage />,
          },
          {
            path: 'order-history',
            element: <OrderHistoryPage />,
          },
          {
            path: 'order-history/:orderId',
            element: <OrderHistoryDetailsPage />,
          },
          {
            path: 'takeaways',
            element: <TakeawayPage />,
          },
          {
            path: 'shift-summary',
            element: <ShiftSummaryPage />,
          }
        ]
      }
    ]
  }
]);






