import React, { useEffect, useRef, useState } from 'react'
import {backgroundDesigns, 
    svgPatterns, 
    navbarAnimations,
    navbarStyles} from '../assets/dummyStyles.js'
import { useNavigate } from 'react-router-dom'
import {SignInButton,
  UserButton,
  SignedIn,
  SignedOut} from '@clerk/clerk-react';
import {Menu, X} from 'lucide-react';
const Navbar = ({ logoSrc, quizType = "default"}) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const navRef = useRef(null);
    const menuBtnRef = useRef(null);
    const menuRef = useRef(null);

    const design = backgroundDesigns[quizType] || backgroundDesigns.default;
    const pattern = svgPatterns[design.pattern] || svgPatterns.abstract; 
    //Close menu  when click outside of the box
    useEffect(() => {
    if (!menuOpen) return;

    const handleDocClick = (e) => {
      if (
        navRef.current?.contains(e.target) ||
        menuBtnRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener("click", handleDocClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleDocClick, { capture: true });
  }, [menuOpen]);
    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };
  return (
    <div className={navbarStyles.container}>
        <nav ref={navRef} className={navbarStyles.nav(design.borderColor, isHovering)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
            <div className={navbarStyles.patternContainer}>
                <div className={navbarStyles.patternLayer}style={{
                    backgroundImage: pattern,
                    ...navbarStyles.backgroundPatternStyle,
                }}
                />
            </div>
            <div className={navbarStyles.innerContainer}>
                <div className={navbarStyles.flexContainer}>
                    <div className={navbarStyles.logoSection}>
                        <button className={navbarStyles.logoButton} onClick={() => goTo("/")}>
                            <img  src={
                    logoSrc ||
                    "https://www.bing.com/th/id/OIP.JXN-WMxoFTOgASpupFVL6QHaHa?w=193&h=193&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  }
                  alt="logo"
                  className={navbarStyles.logoImage} ></img>
                        </button>
                    </div>
                    <div className={navbarStyles.titleContainer}>
                        <div className={navbarStyles.titleWrapper}>
                            <div className={navbarStyles.titleBox}>
                                <h1 className={navbarStyles.titleText(design.textColor)}>
                                    <span className={navbarStyles.titleGradient}>
                                        Webel Mock Test
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className={navbarStyles.desktopButtons}>
                        <SignedOut when="signed-out">
                            <SignInButton mode='modal'>
                                <button className={navbarStyles.buttonBase(design.accentColor)}>
                                    My result
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn when="signed-in">
                            <button onClick={() => navigate("/result")} className={navbarStyles.buttonBase(design.accentColor)}>
                                My result
                            </button>
                        </SignedIn>

                        <SignedOut when="signed-out">
                            <SignInButton mode='modal'>
                                <button className={navbarStyles.buttonBase(design.accentColor)}
                                >
                                    Login
                                </button>
                            </SignInButton>
                        </SignedOut>


                        <SignedIn when="signed-in">
                            <div className=' flex items-center justify-center ml-3'>
                                <UserButton appearance={{
                                    elements:{
                                        avatarBox: 'w-9 h-9'
                                    }
                                }}></UserButton>
                            </div>
                        </SignedIn>

                    </div>
                    {/* for mobile*/}
                    <button 
                    ref={menuBtnRef}
                    className={`lg:hidden ${navbarStyles.mobileMenuButton(design.accentColor)}`}
                   onClick={() => setMenuOpen((s) => !s)} 
                   >
                    {menuOpen ? (
                        <X />
                    ): <Menu />}
                   </button>
                </div>
                 {menuOpen && (
                    <div ref={menuRef} className={navbarStyles.mobileMenuWrapper}>
                        <SignedOut when="signed-out">
                            <SignInButton mode='modal'>
                                <button className={navbarStyles.buttonBase(design.accentColor)}
                                >
                                    My Results
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn when="signed-in">
                            <button onClick={() => {
                                navigate("/result");
                                setMenuOpen(false);
                            }} className={navbarStyles.buttonBase(design.accentColor)}>
                                My Results
                            </button>
                        </SignedIn>
                        <SignedOut when="signed-out">
                            <SignInButton mode='modal'>
                                <button
                                className={navbarStyles.buttonBase(design.accentColor)}>
                                    Login
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn when="signed-in">
                            <UserButton />

                        </SignedIn>
                    </div>
                 )}
            </div>
        </nav>
        <style> {navbarAnimations}</style>
    </div>
  );
};

export default Navbar