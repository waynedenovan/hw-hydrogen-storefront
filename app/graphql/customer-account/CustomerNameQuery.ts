export const CUSTOMER_NAME_QUERY = `#graphql
  query CustomerName {
    customer {
      firstName
    }
  }
` as const;
