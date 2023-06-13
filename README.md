# AlgoKit React Starter Template

This template provides a baseline React web app for developing integrating with any [ARC32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) compliant Algorand smart contracts.

To use it [install AlgoKit](https://github.com/algorandfoundation/algokit-cli#readme) and then either pass in `-t react_starter` to `algokit init` or select the `react_starter` template interactively during `algokit init`.

This is one of the official frontend templates used by AlgoKit to initialise an Algorand enabled React web app ready for integrating with your smart contracts. It's made by relying on a [Copier templates](https://copier.readthedocs.io/en/stable/).

## Features

This template supports the following features:

-   React web app with [Tailwind CSS](https://tailwindcss.com/) and [TypeScript](https://www.typescriptlang.org/)
-   Styled framework agnostic CSS components using [DaisyUI](https://daisyui.com/).
-   Starter jest unit tests for typescript functions. Can be disabled if not needed.
-   Starter [playwright](https://playwright.dev/) tests for end to end testing. Can be disabled if not needed.
-   Integration with [use-wallet](https://github.com/txnlab/use-wallet) for connecting to Algorand wallets such as Pera, Defly and Exodus.
-   Example of performing a transaction.
-   Dotenv support for environment variables, as well as a local only KMD provider that can be used for connecting the frontend component to an `algokit localnet` instance (docker required).
-   CI pipeline using GitHub Actions (CD to be defined later)

# Getting started

Once the template is instantiated you can follow the [README.md](template_content/README.md.jinja) file to see instructions for how to use the template.
