import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { MenuPage } from '../../pages/Menu/MenuPage';
import { DineInPage } from '../../pages/DineIn/DineInPage';
import { TakeawayPage } from '../../pages/Takeaway/TakeawayPage';
import { ItemOnOffPage } from '../../pages/ItemOnOff/ItemOnOffPage';
import { MoneyManagementPage } from '../../pages/MoneyManagement/MoneyManagementPage';
import { OrderHistoryPage } from '../../pages/OrderHistory/OrderHistoryPage';
import { OrderHistoryDetailsPage } from '../../pages/OrderHistoryDetails/OrderHistoryDetailsPage';
import { ShiftSummaryPage } from '../../pages/ShiftSummary/ShiftSummaryPage';
import { LoginPage } from '../../pages/Auth/LoginPage';
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
