// src/utils/dataStorage.js

export const saveDataToLocalStorage = (data, key) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data to localStorage:", error);
    }
};

export const loadDataFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
        return null;
    }
};
