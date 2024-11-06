<p align="center">
  <a href="" rel="noopener">
 <img width=90px height=90px src="./public/logo.png" alt="logo"></a>
</p>

<h3 align="center">NEXTJS Boilerplate</h3>

## 📝 Table of Contents

- [What does have?](#doeshave)
- [Getting Started](#getting_started)

## 📦 What does the project have? <a name="doeshave">

- The project uses Next.js version 14 and the App Router.
- For tests [Vitest](https://vitest.dev/guide/) are implemented using @testing-library
- For storage, [zustend](https://next-auth.js.org/) is used, with the "loading" component as an example of usage.
- Prettier eslint and lintstaged for organization code

- Husky has also been implemented for:
  Commitlint
  Pre-commit with lint-staged and Prettier
  Pre-push running lint-staged tests and build
  Vitest tests are implemented using @testing-library.

- The next-config includes PWA configurations.
- Image permissions are set up, for example, for Google authentication.

- [usehook-ts](https://usehooks-ts.com/) is also installed.
- For visual designer using [tailwind](https://tailwindcss.com/docs/width)

## 🔦 Instructions for installing the boilerplate. <a name="getting_started">

```
npx create-next-app@latest -e https://github.com/italobarrosme/nezuko
```

Run

```
npm install
npm run dev
```
