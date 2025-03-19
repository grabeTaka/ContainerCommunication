import type { Config } from 'jest'

const config: Config = {
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['<rootDir>/jest/setEnvVars.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
}

export default config
