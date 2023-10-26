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

const error404 = {
    path: "*",
    Component: Page404
  }
  
  const router = createBrowserRouter([
    {
      path: "home",
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
          path: 'parties',
          Component: Parties
        },
        {
          path: 'sales',
          element: <SaleList />,
        },
        {
          path: 'purchase',
          Component: PurchaseList
        },
        {
          path: 'inventory',
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