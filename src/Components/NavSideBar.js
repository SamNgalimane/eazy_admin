import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "../Styles/SideBar.css";
import { IconContext } from "react-icons/lib";

// Create styled components
const Nav = styled.div`
background: rgb(5, 68, 104);
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: rgb(5, 68, 104);
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: all 0.5s ease;
z-index: 10;
`;

const SidebarWrap = styled.div`width: 100%;`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{ color: "#fff" }}>
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar} color={"#B8860C"}/>
                </NavIcon>
                <h1 style={{justifyContent: "center", textAlign: "center", marginLeft: "200px", color: "#B8860C" }}>
                    Eazy-Admin
                </h1>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose onClick={showSidebar} color={"#B8860C"}/>
                    </NavIcon>
                    <div className="sidebar">
                        <ul>
                            <NavLink exact="true" to="/">
                                <li>
                                    <span className="icon"><AiIcons.AiOutlineHome /></span>
                                    <span className="item">Home</span>
                                </li>
                            </NavLink>
                            <NavLink exact="true" to="/SupplierData">
                                <li>
                                    <span className="icon"><AiIcons.AiOutlineTeam /></span>
                                    <span className="item">Suppliers</span>
                                </li>
                            </NavLink>
                            <NavLink exact="true" to="/ContractData">
                                <li>
                                    <span className="icon"><AiIcons.AiOutlineForm /></span>
                                    <span className="item">Contract</span>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
        </>
    );
};

export default Sidebar;