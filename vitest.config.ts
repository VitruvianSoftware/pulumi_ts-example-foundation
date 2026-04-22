import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["modules/**/*.test.ts", "test/**/*.test.ts"],
        coverage: {
            provider: "v8",
            include: ["modules/**/*.ts"],
            exclude: ["modules/**/index.ts", "modules/**/*.test.ts"],
        },
    },
});
