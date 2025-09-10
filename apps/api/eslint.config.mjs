import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
  // Bỏ qua file build & test
  { ignores: ["dist/**", "**/*.spec.ts"] },

  // Cấu hình TS cơ bản
  ...tseslint.configs.recommended,

  // Rule bổ sung cho mã nguồn API
  {
    files: ["src/**/*.ts"],
    plugins: { prettier },
    rules: {
      // Cho phép EOL auto để không lỗi CRLF trên Windows
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      // Không chặn promise chưa await (ta đã bắt lỗi trong main.ts rồi)
      "@typescript-eslint/no-floating-promises": "off"
    }
  }
];
