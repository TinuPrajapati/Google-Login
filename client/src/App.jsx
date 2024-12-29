import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="p-16 w-[100vw] h-[100vh] bg-custom3 font-Nuntio">
      <Outlet />
    </div>
  )
}