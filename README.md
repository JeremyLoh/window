# window

Application that has "mini-apps" that I am interested in building

Made using Next.js, Supabase, TailwindCSS and Cypress

Random default profile avatar made using https://ui-avatars.com/

Hosted using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

# Environment Variables

1. Create a `.env.local` file in the project root and add the following environment variables:
   ```text
   NEXT_PUBLIC_MAPBOX_PK_API_KEY=???
   TOMTOM_API_KEY=???
   NEXT_PUBLIC_SUPABASE_URL=???your-supabase-url???
   NEXT_PUBLIC_SUPABASE_ANON_KEY=???your-supabase-anon-key???
   ECONDB_API_KEY=???????[Key from https://www.econdb.com/api/series/?page=1]  
   ```
    - We are using `NEXT_PUBLIC_` for accessing this public key in React components.
    - https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
    - This should *NOT* be done for PRIVATE KEYS! Private keys should not be exposed to the client side as they can
      be seen during network requests!
    - TOMTOM_API_KEY -> https://developer.tomtom.com/search-api/documentation/search-service/nearby-search
    - SUPABASE - https://supabase.com/docs/guides/auth/auth-helpers/nextjs
    - ECONDB - https://www.econdb.com/api/series/?page=1

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
- [This is the Only Right Way to Write React clean-code - SOLID](https://www.youtube.com/watch?v=MSq_DCRxOxw)
- [React Formik Tutorial with Yup (React Form Validation)](https://www.youtube.com/watch?v=7Ophfq0lEAY)
- [Supabase auth helpers nextjs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use
  server"](https://stackoverflow.com/questions/75676177/error-functions-cannot-be-passed-directly-to-client-components-unless-you-expli)
- [Next.js 13: Can't resolve 'src/app/dashboard/layout.tsx'(deleted optional layout)](https://stackoverflow.com/questions/76482218/nextjs-13-cant-resolve-src-app-dashboard-layout-tsx-deleted-optional-layout)
- [Next.js: Router.push with state](https://stackoverflow.com/questions/55182529/next-js-router-push-with-state)
- [Next.js 13: Dynamic routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [File Conventions - page.js](https://nextjs.org/docs/app/api-reference/file-conventions/page)

## Database reference

- [Normalization - 1NF, 2NF, 3NF and 4NF](https://www.youtube.com/watch?v=UrYLYV7WSHM)
    - 1st Normal Form (1NF)
        - Each column to be single valued (e.g. cannot be "a,b")
        - Entries in a column are same type
        - Rows can be uniquely identified - add unique id, or add more columns to make unique
            - The order of the rows and the order of the columns are not relevant
    - 2nd Normal Form (2NF)
        - All attributes (non-key columns) are dependent on key
    - 3rd Normal Form (3NF)
        - All fields (columns) can be determined only by the key in the table and no other column
    - 4th Normal Form (4NF)
        - No multi-valued dependencies
- [Supabase - One-to-Many Relationship - SupabaseTips](https://www.youtube.com/watch?v=5VrF9OVQ6rg)
- [Supabase Docs (Database) - Tables and Data](https://supabase.com/docs/guides/database/tables)
- [Implement Authorization using Row Level Security with Supabase](https://www.youtube.com/watch?v=Ow_Uzedfohk)
- [Adding a new row to table for new user sign up, using triggers](https://supabase.com/docs/guides/auth/managing-user-data#using-triggers)