import { DashboardHome } from "./DashboardHome";
import { DashboardLayout } from "./DashboardLayout";
import { GetCreditPage } from "./GetCreditPage";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHome />
      <GetCreditPage />

      {/* When you add more pages later, just swap DashboardHome with the new component */}
    </DashboardLayout>
  );
}

export default Dashboard;
