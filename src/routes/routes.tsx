import { createBrowserRouter, Route, Navigate, RouteProps } from "react-router-dom";
import React, { ReactElement } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Accounting from "../pages/accounting/Accounting";
import Settings from "../pages/settings/Settings";
import Layout from "../layouts/Layout";
import Page404 from "../pages/Page404";
import SaleList from "../pages/sale/SaleList";
import InventoryList from "../pages/inventory/InventoryList";
import PurchaseList from "../pages/purchase/PurchaseList";
import CustomerList from "../pages/parties/CustomerList";
import SupplierList from "../pages/parties/SupplierLIst";
import Login from "../pages/Login/Login";
import PurchaseInvoice from "../pages/purchase/PurchaseInvoice";
import PurchaseOrder from "../pages/purchase/PurchaseOrder";

interface PrivateRouteProps extends RouteProps {
  element?: ReactElement;
  fallback?: string;
}

const error404: RouteProps = {
  path: "*",
  element: <Page404 />,
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, fallback = "/login" }) => {
  const authenticated = localStorage.getItem('isERPLoggedIn');
  return authenticated ? element ? element : <Navigate to="/app" replace /> : <Navigate to={fallback} replace />;
}

const protectedRoutes = [
  {
    path: 'app/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'sales/sales-orders', element: <SaleList /> },
      { path: 'sales/customers', element: <CustomerList /> },
      { path: 'purchase/orders', element: <PurchaseList /> },
      { path: 'purchase/orders/new', element: <PurchaseOrder /> },
      { path: 'purchase/suppliers', element: <SupplierList /> },
      { path: 'purchase/invoice', element: <PurchaseInvoice /> },
      { path: 'purchase/invoice/new', element: <PurchaseInvoice /> },
      { path: 'inventory/products', element: <InventoryList /> },
      { path: 'inventory/stock', element: <InventoryList /> },
      { path: 'accounting', element: <Accounting /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
];

const protectedRouteComponents = protectedRoutes.map(({ path, element, children }) => ({
  path,
  element: <PrivateRoute element={element as ReactElement} />,
  children,
}));

const routes: RouteProps[] = [
  ...protectedRouteComponents,
  { path: "login", element: <Login /> },
  {path: '/', element: <PrivateRoute /> },
  error404,
];

const router = createBrowserRouter(routes);

export default router;