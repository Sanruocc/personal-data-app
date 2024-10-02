// src/pages/Settings.js
import React from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
    padding: 40px;
    background-color: #f3f7fa;
    min-height: 100vh;
`;

const SettingsCard = styled.div`
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
    margin: 0;
    color: #333;
`;

const InputField = styled.input`
    padding: 10px;
    margin-top: 10px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const SaveButton = styled.button`
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #218838;
    }
`;

const Settings = () => {
    return (
        <SettingsContainer>
            <h1>Settings</h1>
            <SettingsCard>
                <CardTitle>Account Settings</CardTitle>
                <InputField type="text" placeholder="Update your username" />
                <InputField type="email" placeholder="Update your email" />
                <SaveButton>Save Changes</SaveButton>
            </SettingsCard>
            <SettingsCard>
                <CardTitle>Backup and Restore</CardTitle>
                <p>Backup your data and restore it when needed.</p>
                <SaveButton>Backup Data</SaveButton>
                <SaveButton>Restore Data</SaveButton>
            </SettingsCard>
        </SettingsContainer>
    );
};

export default Settings;
