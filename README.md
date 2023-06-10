# window

Application that has "mini-apps" that I am interested in building

Made using Next.js, TailwindCSS and Cypress

Hosted using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

# Environment Variables

- Create a `.env.local` file in the project root and add the following environment variables:
  ```text
  NEXT_PUBLIC_MAPBOX_PK_API_KEY=???
  TOMTOM_API_KEY=???
  ```
  We are using `NEXT_PUBLIC_` for accessing this public key in React components.
    - https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
    - This should *NOT* be done for PRIVATE KEYS! Private keys should not be exposed to the client side as they can
      be seen during network requests!
- TOMTOM_API_KEY -> https://developer.tomtom.com/search-api/documentation/search-service/nearby-search

# References

- [How to write component tests with Cypress](https://www.youtube.com/watch?v=vJ0rDP4CG-w)
- To learn more about Next.js, take a look at the following resources:
    - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
    - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [How do I get the content in Javascript popups with Cypress?](https://stackoverflow.com/a/66630041)
- [Idiomatic way to append an element in jsx](https://stackoverflow.com/questions/42790969/idiomatic-way-to-append-an-element-in-jsx)
- [Create tabs with React](https://www.youtube.com/watch?v=WkREeDy2WQ4)
- [Type your functions in TypeScript and SAVE TIME](https://www.youtube.com/watch?v=Gcr4t6cH-lU)
- [Keeping Your Data Secure: Environment Variables in NextJS / React](https://www.youtube.com/watch?v=v3O3kxI_9ZM)
- [All useEffect Mistakes Every Junior React Developer Makes](https://www.youtube.com/watch?v=QQYeipc_cik)
- [How to open a link in a new tab](https://stackoverflow.com/questions/65632698/how-to-open-a-link-in-a-new-tab-in-nextjs)
- [Noreferrer noopener](https://www.reliablesoft.net/noreferrer-noopener/)
- [External link is not working in nextjs when you want to use link component](https://stackoverflow.com/questions/61059111/external-link-is-not-working-in-next-js-when-you-want-to-use-link-component)
    - We need to add "//" before the url so that navigation is done to external url. e.g. `<a href={"//" + place.url} target="_blank" rel="noopener noreferrer">`
