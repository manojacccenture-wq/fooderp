import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { MenuPage } from '../../pages/Menu/MenuPage';
import { DineInPage } from '../../pages/DineIn/DineInPage';
import { ItemOnOffPage } from '../../pages/ItemOnOff/ItemOnOffPage';
import { MoneyManagementPage } from '../../pages/MoneyManagement/MoneyManagementPage';
import { OrderHistoryPage } from '../../pages/OrderHistory/OrderHistoryPage';
import { OrderHistoryDetailsPage } from '../../pages/OrderHistoryDetails/OrderHistoryDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard/menu" replace />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
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
        element: <MenuPage initialOrderType="take_away" />,
      }
    ]
  }
]);
