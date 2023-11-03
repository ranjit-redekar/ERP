import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Accounting from "./pages/accounting/Accounting";
import Settings from "./pages/settings/Settings";
import Layout from "./layouts/Layout";
import Page404 from "./pages/Page404";
import SaleList from "./pages/sale/SaleList";
import InventoryList from "./pages/inventory/InventoryList";
import PurchaseList from "./pages/purchase/PurchaseList";
import Parties from "./pages/parties/Parties";
import CustomerList from "./pages/parties/CustomerList";
import SupplierList from "./pages/parties/SupplierLIst";

const error404 = {
    path: "*",
    Component: Page404
  }
  
  const router = createBrowserRouter([
    {
      path: "app",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'dashboard',
          Component: Dashboard
        },
        {
          path: 'sales/sales-orders',
          element: <SaleList />,
        },
        {
          path: 'sales/customers',
          element: <CustomerList />,
        },
        {
          path: 'purchases/purchases-orders',
          Component: PurchaseList
        },
        {
          path: 'purchases/suppliers',
          element: <SupplierList />,
        },
        {
          path: 'inventory/products',
          element: <InventoryList />,
        },
        {
          path: 'inventory/stock',
          element: <InventoryList />,
        },
        {
          path: 'accounting',
          Component: Accounting
        },
        {
          path: 'settings',
          Component: Settings
        },
        {...error404}
      ],
    },
    {...error404}
  ]);
  export default router;