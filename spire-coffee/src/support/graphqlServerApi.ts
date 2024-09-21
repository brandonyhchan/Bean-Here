import { gql } from "@apollo/client";

export const signUpMutation = gql`
  query signUp(
    $userName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      userName: $userName
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
      user {
        id
        userName
      }
    }
  }
`;

export const loginQuery = gql`
  query login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      user {
        id
        userName
      }
    }
  }
`;

export const returnAllCafeQuery = gql`
  query ReturnAllCafes(
    $filterByName: String
    $busynessFilter: String
    $noiseFilter: String
    $priceFilters: [String]
    $userLocation: locationInput
    $distanceFilter: Int
  ) {
    returnAllCafes(
      filterByName: $filterByName
      busynessFilter: $busynessFilter
      noiseFilter: $noiseFilter
      priceFilters: $priceFilters
      userLocation: $userLocation
      distanceFilter: $distanceFilter
    ) {
      id
      stringId
      name
      street
      city
      province
      profilePhotoURL
      busyness
      noisiness
      price
    }
  }
`;

export const getCafeInfo = gql`
  query getCafeInfo($stringId: String!) {
    getCafeInfo(stringId: $stringId) {
      id
      name
      street
      city
      province
      postalCode
      phoneNumber
      website
      profilePhotoURL
      busyness
      noisiness
      price
    }
  }
`;
