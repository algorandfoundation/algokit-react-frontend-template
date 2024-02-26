<div align="center">
<a href="https://github.com/algorandfoundation/algokit-react-frontend-template"><img src="https://bafybeibsg44yt327gd7jxfsetk6tw6zcxqnrb5hlqsnowlolncnw3qxhjm.ipfs.nftstorage.link/" width=60%></a>
</div>

<p align="center">
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-cli"><img src="https://img.shields.io/badge/docs-repository-00dc94?logo=github&style=flat.svg" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img src="https://img.shields.io/badge/learn-AlgoKit-00dc94?logo=algorand&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-react-frontend-template"><img src="https://img.shields.io/github/stars/algorandfoundation/algokit-react-frontend-template?color=00dc94&logo=star&style=flat" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img  src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Falgorandfoundation%2Falgokit-react-frontend-template&countColor=%2300dc94&style=flat" /></a>
</p>

---

This template provides a baseline React web app for developing integrating with any [ARC32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) compliant Algorand smart contracts.

To use it [install AlgoKit](https://github.com/algorandfoundation/algokit-cli#readme) and then either pass in `-t react` to `algokit init` or select the `react` template interactively during `algokit init`.

This is one of the official frontend templates used by AlgoKit to initialise an Algorand enabled React web app ready for integrating with your smart contracts. It's made by relying on a [Copier templates](https://copier.readthedocs.io/en/stable/).

## Features

This template supports the following features:

- React web app with [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/)
- Styled framework agnostic CSS components using [DaisyUI](https://daisyui.com/).
- Starter jest unit tests for typescript functions. Can be disabled if not needed.
- Starter [playwright](https://playwright.dev/) tests for end to end testing. Can be disabled if not needed.
- Integration with [use-wallet](https://github.com/txnlab/use-wallet) for connecting to Algorand wallets such as Pera, Defly and Exodus.
- Example of performing a transaction.
- Dotenv support for environment variables, as well as a local only KMD provider that can be used for connecting the frontend component to an `algokit localnet` instance (docker required).
- CI/CD pipeline using GitHub Actions (Vercel or Netlify for hosting)

## Getting started

Once the template is instantiated you can follow the [README.md](template_content/README.md.jinja) file to see instructions for how to use the template.

### Interactive Wizard

**To initialize using the `algokit` CLI**:

- Execute the command `algokit init`. This initiates an interactive wizard that assists in selecting the most appropriate template for your project requirements.

**To initialize within GitHub Codespaces**:

- Follow these steps to leverage GitHub Codespaces for template selection:

  1. Go to the [algokit-base-template](https://github.com/algorandfoundation/algokit-base-template) repository.
  2. Initiate a new codespace by selecting the `Create codespace on main` option. This can be found by clicking the `Code` button, then navigating to the `Codespaces` tab.
  3. Upon codespace preparation, `algokit` will automatically start `LocalNet` and present a prompt with the next steps. Executing `algokit init` will initiate the interactive wizard.
