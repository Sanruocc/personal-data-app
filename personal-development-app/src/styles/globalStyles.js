import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        background-color: #f4f7fa;
        color: #333;
    }

    h2 {
        font-weight: 600;
        margin-bottom: 15px;
    }

    input {
        padding: 12px;
        border: 2px solid #ccc;
        border-radius: 6px;
        margin-right: 10px;
        font-size: 16px;
        transition: all 0.3s ease;

        &:focus {
            outline: none;
            border-color: #4A90E2;
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
        }
    }

    button {
        padding: 12px 20px;
        border: none;
        border-radius: 6px;
        background-color: #4A90E2;
        color: white;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #357ABD;
        }

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }

    li {
        list-style: none;
        margin-bottom: 10px;
    }

    a {
        text-decoration: none;
        color: #4A90E2;
        transition: color 0.2s ease;

        &:hover {
            color: #357ABD;
        }
    }
`;

export default GlobalStyle;
