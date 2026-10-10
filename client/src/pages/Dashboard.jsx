import LogoutBtn from "../components/LogoutBtn.jsx";

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>You are logged in and viewing a protected page.</p>
      <LogoutBtn />
    </main>
  );
}