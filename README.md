
# Getting Started

Follow these steps to navigate and work with the project:

## Running the API
To start the API, use the following command:
```bash
npx nx serve api
```

## Running API End-to-End Tests
To execute the end-to-end tests for the API, run:
```bash
npx nx e2e api-e2e
```

# Creating a Product API Library

To create a product API library, use the following command:

```bash
npx nx generate @backend/plugins:api-libs --name=<product-name>
```

Replace `<product-name>` with the name of your product. For example, to create a library for "ticketing," run:

```bash
npx nx generate @backend/plugins:api-libs --name=ticketing
```

This will generate the necessary files and structure for the API library.

## Adding a Product API to `app.module.ts`
To include a product API in the `app.module.ts` file, import the module for your product API and add it to the `imports` array. For example:
```typescript
import { TicketingApiModule } from '@backend/ticketing-api';

@Module({
    imports: [
        TicketingApiModule,
        // other modules
    ],
})
export class AppModule {}
```

## Running Tests for a Product API
To run tests for a specific product API, use the following command:
```bash
npx nx test <product-api>
```
For example, to test the "ticketing" API:
```bash
npx nx test ticketing-api
```
