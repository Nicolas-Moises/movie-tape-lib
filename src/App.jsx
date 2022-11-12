import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <div className="w-full max-w-6xl flex flex-col justify-center mx-auto px-6 lg:px-6">
      <Navbar />
      <Outlet />
    </div>
  );
}
