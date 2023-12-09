import { useLocation, Link } from "react-router-dom";
import logo from "../../images/logo.svg";

const Header = ({ email, onSignOut }) => {
  const location = useLocation();

  let title, route;

  if (location.pathname === "/sign-up") {
    title = "Войти";
    route = "/sign-in";
  } else if (location.pathname === "/sign-in") {
    title = "Регистрация";
    route = "/sign-up";
  } else {
    title = "Выйти";
    route = "";
  }

  const customOnClick = title === "Выйти" ? onSignOut : null;

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      <nav className="header__auth-menu">
        <p className="header__auth-name">{email}</p>
        <Link to={route} className="header__link" onClick={customOnClick}>
          {title}
        </Link>
      </nav>
    </header>
  );
};

export default Header;

// import { useLocation, Link } from "react-router-dom";
// import logo from "../../images/logo.svg";

// const Header = ({ email, onClick }) => {
//   const location = useLocation();

//   let title, route;

//   // Определение заголовка и пути в зависимости от текущего пути
//   if (location.pathname === '/sign-up') {
//     title = 'Войти';
//     route = '/sign-in';
//   } else if (location.pathname === '/sign-in') {
//     title = 'Регистрация';
//     route = '/sign-up';
//   } else {
//     title = 'Выйти';
//     route = '';
//   }

//   return (
//     <header className="header">
//       <img className="header__logo" src={logo} alt="Лого" />
//       <nav className="header__auth-menu">
//         <p className="header__auth-name">{email}</p>
//         <Link to={route} className="header__link" onClick={onClick}>
//           {title}
//         </Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;
