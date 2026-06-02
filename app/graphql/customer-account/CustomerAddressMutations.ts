export const CUSTOMER_ADDRESS_CREATE_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;

export const CUSTOMER_ADDRESS_UPDATE_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
    $language: LanguageCode
 ) @inContext(language: $language) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;

export const CUSTOMER_ADDRESS_DELETE_MUTATION = `#graphql
  mutation customerAddressDelete(
    $addressId: ID!
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
` as const;
