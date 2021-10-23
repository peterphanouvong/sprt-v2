import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuickEvent: QuickEvent;
  updateQuickEvent?: Maybe<QuickEvent>;
  joinQuickEvent: QuickEvent;
  uploadImage: Scalars['Boolean'];
  uploadBannerImage: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
};


export type MutationCreateQuickEventArgs = {
  input: QuickEventInput;
};


export type MutationUpdateQuickEventArgs = {
  input: QuickEventInput;
  id: Scalars['Float'];
};


export type MutationJoinQuickEventArgs = {
  id: Scalars['Float'];
  input: QuickEventUserInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadBannerImageArgs = {
  clubname: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationRegisterArgs = {
  options: UserRegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  clubNameOrEmail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  quickEvent?: Maybe<QuickEvent>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  userByClubName?: Maybe<User>;
};


export type QueryQuickEventArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUserByClubNameArgs = {
  clubName: Scalars['String'];
};

export type QuickEvent = {
  __typename?: 'QuickEvent';
  id: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  users: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type QuickEventInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  users?: Maybe<Scalars['String']>;
};

export type QuickEventUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  beemId: Scalars['String'];
  status: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newQuickEvent: QuickEvent;
};


export type SubscriptionNewQuickEventArgs = {
  id: Scalars['Float'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  clubName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  clubName: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', message: string, field: string };

export type RegularUserFragment = { __typename?: 'User', id: number, clubName: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> } };

export type CreateQuickEventMutationVariables = Exact<{
  createQuickEventInput: QuickEventInput;
}>;


export type CreateQuickEventMutation = { __typename?: 'Mutation', createQuickEvent: { __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string, updatedAt: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type JoinQuickEventMutationVariables = Exact<{
  joinQuickEventId: Scalars['Float'];
  joinQuickEventInput: QuickEventUserInput;
}>;


export type JoinQuickEventMutation = { __typename?: 'Mutation', joinQuickEvent: { __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, updatedAt: string, createdAt: string } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  clubNameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> } };

export type UpdateQuickEventMutationVariables = Exact<{
  updateQuickEventInput: QuickEventInput;
  updateQuickEventId: Scalars['Float'];
}>;


export type UpdateQuickEventMutation = { __typename?: 'Mutation', updateQuickEvent?: Maybe<{ __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> };

export type QuickEventQueryVariables = Exact<{
  quickEventId: Scalars['Int'];
}>;


export type QuickEventQuery = { __typename?: 'Query', quickEvent?: Maybe<{ __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string, updatedAt: string }> };

export type NewQuickEventSubscriptionVariables = Exact<{
  newQuickEventId: Scalars['Float'];
}>;


export type NewQuickEventSubscription = { __typename?: 'Subscription', newQuickEvent: { __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string, updatedAt: string } };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  message
  field
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  clubName
  email
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateQuickEventDocument = gql`
    mutation CreateQuickEvent($createQuickEventInput: QuickEventInput!) {
  createQuickEvent(input: $createQuickEventInput) {
    id
    title
    description
    capacity
    users
    createdAt
    updatedAt
  }
}
    `;

export function useCreateQuickEventMutation() {
  return Urql.useMutation<CreateQuickEventMutation, CreateQuickEventMutationVariables>(CreateQuickEventDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const JoinQuickEventDocument = gql`
    mutation JoinQuickEvent($joinQuickEventId: Float!, $joinQuickEventInput: QuickEventUserInput!) {
  joinQuickEvent(id: $joinQuickEventId, input: $joinQuickEventInput) {
    id
    title
    description
    capacity
    users
    updatedAt
    createdAt
  }
}
    `;

export function useJoinQuickEventMutation() {
  return Urql.useMutation<JoinQuickEventMutation, JoinQuickEventMutationVariables>(JoinQuickEventDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $clubNameOrEmail: String!) {
  login(password: $password, clubNameOrEmail: $clubNameOrEmail) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserRegisterInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateQuickEventDocument = gql`
    mutation UpdateQuickEvent($updateQuickEventInput: QuickEventInput!, $updateQuickEventId: Float!) {
  updateQuickEvent(input: $updateQuickEventInput, id: $updateQuickEventId) {
    id
    title
    description
    capacity
    users
    createdAt
  }
}
    `;

export function useUpdateQuickEventMutation() {
  return Urql.useMutation<UpdateQuickEventMutation, UpdateQuickEventMutationVariables>(UpdateQuickEventDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const QuickEventDocument = gql`
    query QuickEvent($quickEventId: Int!) {
  quickEvent(id: $quickEventId) {
    id
    title
    description
    capacity
    users
    createdAt
    updatedAt
  }
}
    `;

export function useQuickEventQuery(options: Omit<Urql.UseQueryArgs<QuickEventQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuickEventQuery>({ query: QuickEventDocument, ...options });
};
export const NewQuickEventDocument = gql`
    subscription newQuickEvent($newQuickEventId: Float!) {
  newQuickEvent(id: $newQuickEventId) {
    id
    title
    description
    capacity
    users
    createdAt
    updatedAt
  }
}
    `;

export function useNewQuickEventSubscription<TData = NewQuickEventSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewQuickEventSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewQuickEventSubscription, TData>) {
  return Urql.useSubscription<NewQuickEventSubscription, TData, NewQuickEventSubscriptionVariables>({ query: NewQuickEventDocument, ...options }, handler);
};