// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #4A90E2;
    color: white;
    text-align: center;
    padding: 10px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            &copy; 2024 Personal Development App. All Rights Reserved.
        </FooterContainer>
    );
};

export default Footer;
