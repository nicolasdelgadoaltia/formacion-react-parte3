const userTypes = [
    { id: 1, description: "Interno"},
    { id: 2, description: "Externo"},
    { id: 3, description: "Importado"},
];

export const getUserTypes = () => new Promise(resolve => setTimeout(() => resolve(userTypes), 1500));