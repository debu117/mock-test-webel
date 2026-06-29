import React, { useState, useEffect, useRef } from 'react'
import {navbarStyles} from '../assets/dummyStyles.jsx'
import { useNavigate } from 'react-router-dom'
import {SignInButton, useAuth, UserButton, useUser} from '@clerk/react';
//import webelLogo from "../assets/webel_logo.png";
import { Home, List, Menu, User, X } from 'lucide-react';
import { Show } from '@clerk/react';


const Navbar = ({logoSrc = null, siteName = "Webel Mock Test ", rightContent = null,
    onNavigate = null
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const {isSignedIn} = useUser();
    const {getToken} = useAuth();
    const navigate = useNavigate();

    //To collapse the model on escape key
      useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  //Close when resizing to md+ and lock body scroll for mobile view

    useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    const prevOverflow = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow || "";
    };
  }, [mobileOpen]);


    const handleNavigate = (href)=>{
        setMobileOpen(false);
        if(onNavigate) return onNavigate(href);
        try {
            navigate(href);
        } catch (error) {
            window.location.href = href;
        }
    };

    //to save the token
    const prevSignedInRef = useRef(isSignedIn);

    useEffect(()=>{
        let mounted = true;
        async function saveTokenAndMaybeRedirect(){
            if(!isSignedIn || prevSignedInRef.current === isSignedIn) return;
            try {
                const token = await getToken();
                if(token && mounted){
                    localStorage.setItem('clerkToken', token);
                    console.log("Clerk Token saved");
                }
            } catch (err) {
                console.error("Failed to get Clerk Token: ", err);
            }
            const path = window.location.pathname;
            const shouldRedirect = path === '/' || path === '/login' || path === '/signin' || path ==="";
             if(shouldRedirect){
                if(onNavigate) onNavigate("/dashboard");

             else{
                try {
                    navigate('/dashboard');
                } catch  {
                    window.location.href = '/dashboard';
                }
             }
        }
    
    prevSignedInRef.current = isSignedIn;
        }
     saveTokenAndMaybeRedirect();
     return ()=>{
        mounted = false;
     }
    }, [isSignedIn, getToken, navigate, onNavigate]);

  return (
   <nav className={navbarStyles.nav}>
    <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
            <div className={navbarStyles.homeButton}>
                <button type='button' onClick={() => handleNavigate("/dashboard")} className = {navbarStyles.homeButton}
                    >
                    <div className={navbarStyles.logoWrapper}>
                      <img    src={
                    logoSrc ||
                    "https://www.bing.com/th/id/OIP.RNhNbpJsxOZosDkwF7wNPAHaHa?w=193&h=193&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  }
                  alt={`${siteName} logo`}
                  className={navbarStyles.logoImg}></img>
                    
                    
                    </div>
                    <div className={navbarStyles.siteNameWrapper}>
                        <span className={navbarStyles.siteName}>{siteName}</span>
                        <span className={navbarStyles.siteSubtitle}>
                             Exam Platform
                        </span>
                        </div>

                </button>
            </div>
            <Show when = "signed-in">
                <div className={navbarStyles.desktopCenterContainer}>
                    <div className={navbarStyles.desktopCenterInner}>
                        <button onClick={()=> handleNavigate("/dashboard")}
                            className={navbarStyles.dashboardButton}>
                                <Home className={navbarStyles.dashboardIcon}></Home>
                                <span className={navbarStyles.dashboardText}>Dashboard</span>
                            </button>
                            <button onClick={()=> handleNavigate("/list")} className={navbarStyles.listButton}>
                                <List className={navbarStyles.listIcon}></List>
                                <span className={navbarStyles.listText}>List exams</span>
                            </button>
                    </div>
                </div>
            </Show>
            <div className='flex item-center gap-3'>
                <div className={navbarStyles.desktopRightContent}>
                    {rightContent ? (
                        rightContent
                    ): (
                        <div className={navbarStyles.profileGroup}>
                            <Show when="signed-out">
                                <SignInButton mode='modal'>
                                    <button
                                    type='button' className={navbarStyles.profileButton}>
                                        <User className={navbarStyles.profileIcon}></User>
                                        <span>My profile</span>
                                    </button>
                                </SignInButton>
                            </Show>

                            <Show when="signed-in">
                                <div className={navbarStyles.profileGroup}>
                                    <div className={navbarStyles.profileBlur}></div>
                                    <UserButton appearance={{elements: {avatarBox: "w-9 h-9"}}}></UserButton>
                                </div>
                            </Show>
                            
                            </div>
                    )}
                </div>
                <div className={navbarStyles.mobileMenuContainer}>
                    <button type='button' onClick={(e) => {
                        e.stopPropagation();
                        setMobileOpen((s) => !s)
                    }} className={navbarStyles.hamburgerButton}>
                        {mobileOpen ? (
                            <X className={navbarStyles.xIcon}></X>
                        ) : (
                            <Menu className={navbarStyles.menuIcon} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
    {mobileOpen && (
        <div id='mobile-menu' className={navbarStyles.mobileOverlay}>
            <div onClick={() => setMobileOpen(false)}
                className={navbarStyles.mobileBackdrop}
                />
                <div className={navbarStyles.mobilePanel} onClick={(e) => e.stopPropagation()}
                    >
                        <nav className={navbarStyles.mobileNav}>
                            <Show when='signed-in'>
                                <button onClick={() => handleNavigate("/dashboard")} className={navbarStyles.mobileNavButton}>
                                    <Home className={navbarStyles.mobileNavIcon} />
                                    <div>
                                        <div className={navbarStyles.mobileNavItemTitle}>
                                          Dashboard
                                        </div>
                                    </div>
                                </button>
                                <button onClick={() => handleNavigate("/list")}
                                    className={navbarStyles.mobileNavButton}>
                                        <List className={navbarStyles.mobileNavIcon}/>
                                        <div>
                                            <div className={navbarStyles.mobileNavItemTitle}>
                                                List Exams

                                            </div>
                                        </div>

                                </button>
                            </Show>
                            <Show when='signed-out'>
                                <SignInButton mode='modal'>
                                    <button className={navbarStyles.mobileNavButton}>
                                        <User className={navbarStyles.mobileNavIcon}></User>
                                        <div>
                                            <div className={navbarStyles.mobileNavItemTitle}>
                                                Login
                                            </div>
                                        </div>
                                    </button>
                                </SignInButton>
                            </Show>
                            <Show when='signed-in'>
                                <div className={navbarStyles.mobileNavButton}>
                                    <UserButton />
                                </div>

                            </Show>
                        </nav>
                    </div>
        </div>
    )}
   </nav>
  )
}

export default Navbar