import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: #343a40;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
`;

const Logo = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

const Nav = styled.nav`
    a {
        margin-left: 20px;
        color: white;
        font-size: 18px;

        &:hover {
            color: #ffc107;
        }
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>MyDevApp</Logo>
            <Nav>
                <Link to="/">Home</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/notes">Notes</Link>
                <Link to="/goals">Goals</Link>
                <Link to="/settings">Settings</Link>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
