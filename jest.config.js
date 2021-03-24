module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "\\.(css|less|scss|sass)$": "<rootDir>/tests/mock/styleMock.js",
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    }
};