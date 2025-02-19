import { Outlet,Link, NavLink } from "react-router-dom";
import XSvg from "../components/Svg";
import "./Navbar.css"


import { MessageSvg, BookmarkSvg, HomeSvg, SearchSvg, NotificationSvg } from "../components/Svg";


let  navLinks = [
  {
    title: "Home",
    path:"/",
    svg: HomeSvg
  },
  {
    title:"Message",
    path:"/message",
    svg:MessageSvg
  },
  {
    title:"Notification",
    path:"/notification",
    svg:NotificationSvg
  },
  {
    title:"Search",
    path:"/search",
    svg: SearchSvg
  },
  {
    title:"Bookmark",
    path:"/bookmark",
    svg: BookmarkSvg
  }
]

const Layout = () => {
  return (
    <main className="main-container">
      <aside className="nav-container">
      <nav className="navigation">
        <Link to="/" className="main-logo">
          <XSvg/>
        </Link>
        <ul>
          {
            navLinks.map((navItem,index) => 
              (<li key={index}>
                <NavLink className={({isActive})=> isActive ? "nav-acitve nav-item" : "nav-item"} to={navItem.path}>{navItem.svg()} <span className="nav-item-title">{navItem.title}</span></NavLink>
              </li>)
            )
          }
        </ul>
        <div className="profile">

        </div>
      </nav>
      </aside>
      <section className="main-body">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
