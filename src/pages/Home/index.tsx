import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home">
      <Header />
      <Outlet />
    </div>
  )
}
