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
};

export type Club = {
  __typename?: 'Club';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
  description: Scalars['String'];
  followers: Array<User>;
  admins: Array<User>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ClubInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  startTime: Scalars['String'];
  capacity?: Maybe<Scalars['Int']>;
  endTime: Scalars['String'];
  hostId: Scalars['Float'];
  host: User;
  attendees: Array<User>;
  points: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type EventInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  capacity?: Maybe<Scalars['Float']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  addAttendee: User;
  createEvent: Event;
  updateEvent?: Maybe<Event>;
  deleteEvent: Scalars['Boolean'];
  createClub: Club;
  followClub: Scalars['Boolean'];
  addAdmin: Scalars['Boolean'];
  deleteClub: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationAddAttendeeArgs = {
  eventId: Scalars['Int'];
};


export type MutationCreateEventArgs = {
  input: EventInput;
};


export type MutationUpdateEventArgs = {
  input: EventInput;
  id: Scalars['Float'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float'];
};


export type MutationCreateClubArgs = {
  input: ClubInput;
};


export type MutationFollowClubArgs = {
  followerId: Scalars['Float'];
  clubId: Scalars['Float'];
};


export type MutationAddAdminArgs = {
  adminId: Scalars['Float'];
  clubId: Scalars['Float'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['Float'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  points: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  descriptionSnippet: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  events: Array<Event>;
  event?: Maybe<Event>;
  clubs: Array<Club>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Post;
  events: Event;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularClubFragment = { __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string }> };

export type RegularErrorFragment = { __typename?: 'FieldError', message: string, field: string };

export type RegularEventFragment = { __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string }> };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> };

export type AddAttendeeMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type AddAttendeeMutation = { __typename?: 'Mutation', addAttendee: { __typename?: 'User', id: number, username: string, email: string } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type CreateClubMutationVariables = Exact<{
  input: ClubInput;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, description: string, title: string, creatorId: number, createdAt: string, points: number, updatedAt: string, descriptionSnippet: string, creator: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } } };

export type DeleteClubMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteClubMutation = { __typename?: 'Mutation', deleteClub: boolean };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type FollowClubMutationVariables = Exact<{
  followerId: Scalars['Float'];
  clubId: Scalars['Float'];
}>;


export type FollowClubMutation = { __typename?: 'Mutation', followClub: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> } };

export type UpdateEventMutationVariables = Exact<{
  input: EventInput;
  id: Scalars['Float'];
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: Maybe<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string }> }> };

export type ClubsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClubsQuery = { __typename?: 'Query', clubs: Array<{ __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string }> }> };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: number, description: string, title: string, creatorId: number, createdAt: string, points: number, updatedAt: string, descriptionSnippet: string, creator: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } }> };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, description: string, title: string, creatorId: number, createdAt: string, points: number, updatedAt: string, descriptionSnippet: string, creator: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } }> } };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const RegularClubFragmentDoc = gql`
    fragment RegularClub on Club {
  id
  name
  email
  phoneNumber
  description
  createdAt
  updatedAt
  admins {
    ...RegularUser
  }
  followers {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularEventFragmentDoc = gql`
    fragment RegularEvent on Event {
  id
  title
  description
  location
  capacity
  startTime
  endTime
  hostId
  host {
    id
    username
    email
    createdAt
    updatedAt
  }
  attendees {
    ...RegularUser
  }
  points
  createdAt
  updatedAt
}
    ${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  message
  field
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
export const AddAttendeeDocument = gql`
    mutation AddAttendee($eventId: Int!) {
  addAttendee(eventId: $eventId) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useAddAttendeeMutation() {
  return Urql.useMutation<AddAttendeeMutation, AddAttendeeMutationVariables>(AddAttendeeDocument);
};
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
export const CreateClubDocument = gql`
    mutation CreateClub($input: ClubInput!) {
  createClub(input: $input) {
    ...RegularClub
  }
}
    ${RegularClubFragmentDoc}`;

export function useCreateClubMutation() {
  return Urql.useMutation<CreateClubMutation, CreateClubMutationVariables>(CreateClubDocument);
};
export const CreateEventDocument = gql`
    mutation CreateEvent($input: EventInput!) {
  createEvent(input: $input) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    description
    title
    creator {
      id
      username
      email
      createdAt
      updatedAt
    }
    creatorId
    createdAt
    points
    updatedAt
    descriptionSnippet
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeleteClubDocument = gql`
    mutation DeleteClub($id: Float!) {
  deleteClub(id: $id)
}
    `;

export function useDeleteClubMutation() {
  return Urql.useMutation<DeleteClubMutation, DeleteClubMutationVariables>(DeleteClubDocument);
};
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: Float!) {
  deleteEvent(id: $id)
}
    `;

export function useDeleteEventMutation() {
  return Urql.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const FollowClubDocument = gql`
    mutation FollowClub($followerId: Float!, $clubId: Float!) {
  followClub(followerId: $followerId, clubId: $clubId)
}
    `;

export function useFollowClubMutation() {
  return Urql.useMutation<FollowClubMutation, FollowClubMutationVariables>(FollowClubDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
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
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateEventDocument = gql`
    mutation UpdateEvent($input: EventInput!, $id: Float!) {
  updateEvent(input: $input, id: $id) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useUpdateEventMutation() {
  return Urql.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument);
};
export const ClubsDocument = gql`
    query Clubs {
  clubs {
    ...RegularClub
  }
}
    ${RegularClubFragmentDoc}`;

export function useClubsQuery(options: Omit<Urql.UseQueryArgs<ClubsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ClubsQuery>({ query: ClubsDocument, ...options });
};
export const EventsDocument = gql`
    query Events {
  events {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useEventsQuery(options: Omit<Urql.UseQueryArgs<EventsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventsQuery>({ query: EventsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    description
    title
    creator {
      id
      username
      email
      createdAt
      updatedAt
    }
    creatorId
    createdAt
    points
    updatedAt
    descriptionSnippet
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      id
      description
      title
      creator {
        id
        username
        email
        createdAt
        updatedAt
      }
      creatorId
      createdAt
      points
      updatedAt
      descriptionSnippet
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};