# test_all_default_parameters_on_vercel

This starter React project has been generated using AlgoKit. See below for default getting started instructions.

# Setup

### Initial setup

1. Clone this repository locally
2. Install pre-requisites:
   - Install `AlgoKit` - [Link](https://github.com/algorandfoundation/algokit-cli#install): The minimum required version is `1.1`. Ensure you can execute `algokit --version` and get `1.1` or later.
   - Bootstrap your local environment; run `algokit bootstrap all` within this folder, which will run `npm install` to install NPM packages and dependencies for your frontend component/webapp.
3. Open the project and start debugging / developing via:
   - VS Code
     1. Open the repository root in VS Code
     2. Install recommended extensions
     3. Hit F5 (or whatever you have debug mapped to) and it should start running with breakpoint debugging.
   - Other
     1. Open the repository root in your text editor of choice
     2. In a terminal run `npm run dev`

### Subsequently

1. If you update to the latest source code and there are new dependencies you will need to run `algokit bootstrap all` again
2. Follow step 3 above

### Continuous Integration

This project uses [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) to define CI workflows, which are located in the [`.github/workflows`](./.github/workflows) folder.

For pull requests and pushes to `main` branch against this repository the following checks are automatically performed by GitHub Actions:

- `install`: Installs dependencies using `npm`
- `lint`: Lints the codebase using `ESLint`
- `build`: Builds the codebase using `vite`

### Continuous Deployment

The project template provides base Github Actions workflows for continuous deployment to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). These workflows are located in the [`.github/workflows`](./.github/workflows) folder.

> Please note: when configuring the github repository for the first time. Depending on selected provider you will need to set the provider secrets in the repository settings. For netlify you can pass the project specific environment variables as part of Github actions secrets, while for vercel you will need to set the secrets on your site instance (refer to the [Vercel documentation](https://vercel.com/docs/cli#commands/secrets) for more details).

# Tools

This project makes use of React and Tailwind to provider a base project configuration to develop frontends for your Algorand dApps and interactions with smart contracts. The following tools are in use:

- [AlgoKit Utils](https://github.com/algorandfoundation/algokit-utils-ts) - Various TypeScript utilities to simplify interactions with Algorand and AlgoKit.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [daisyUI](https://daisyui.com/) - A component library for Tailwind CSS.
- [npm](https://www.npmjs.com/): Node.js package manager
- [jest](https://jestjs.io/): JavaScript testing framework
- [playwright](https://playwright.dev/): Browser automation library
- [Prettier](https://prettier.io/): Opinionated code formatter
- [ESLint](https://eslint.org/): Tool for identifying and reporting on patterns in JavaScript
- Github Actions workflows for build validation
It has also been configured to have a productive dev experience out of the box in [VS Code](https://code.visualstudio.com/), see the [.vscode](./.vscode) folder.
# Integrating with smart contracts and application clients

Refer to the detailed guidance on [integrating with smart contracts and application clients](./src/contracts/README.md). In essence, for any smart contract codebase generated with AlgoKit or ther tools that produce compile contracts into ARC34 compliant app specifications, you can use the `algokit generate` command to generate TypeScript or Python typed client. Once generated simply drag and drop the generated client into `./src/contracts` and import it into your React components as you see fit.
