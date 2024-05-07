import './index.css';
import HeadLogo from './Logo/Logo';
function Header(){
    return(
        <>
        {/* <!-- Main floating header --> */}
        <header className="floatingheader" >
          <div className="box">
            <nav className="navbar">
              <ul>
                <li className="logo"><HeadLogo /></li>
                <li className="name"><a href="index.html"> Sound Sculptor</a></li>
                <li><a href ="Blog.html" className="btm">Blog</a></li>
                <li><a href ="About.html" className="btm">About</a></li>
              </ul>
              <ul className="bars">    
                <li><a href="Sign-in.html" className="btm">Create your account </a></li>                    <li><a href="Sign-in.html" className="btm">Sign in</a></li>
              </ul>
            </nav>
          </div>
      </header>
    {/* <!-- Placeholderheader that stays in place of the main header so that about doenst collide into header --> */}
    <header className="placeholderheader">
        <div className="box"> 
            <nav className="navbar1">
                <ul>
                    <li className="logo">
                        <HeadLogo />
                    </li>
                    <li className="name"><a href="index.html"> Sound Sculptor</a></li>
                    <li><a href className="btm">Home</a></li>
                    <li><a href className="btm">About</a></li>
                </ul>
                <ul className="bars">    
                    <li><a href="Sign-in.html" className="btm">Create your account </a></li>
                    <li><a href="Sign-in.html" className="btm">Sign in</a></li>
                </ul>
            </nav>
        </div>
        </header>
        </>
    );
}
export default Header