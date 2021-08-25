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
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  followers: Array<User>;
  requestedMembers: Array<User>;
  admins: Array<User>;
  members: Array<User>;
  events?: Maybe<Array<Event>>;
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
  clubId?: Maybe<Scalars['Int']>;
  host: User;
  club?: Maybe<Club>;
  attendees: Array<User>;
  points: Scalars['Float'];
  creatorTypeId: Scalars['Int'];
  publicityTypeId: Scalars['Int'];
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
  creatorTypeId?: Maybe<Scalars['Float']>;
  publicityTypeId?: Maybe<Scalars['Float']>;
  clubId?: Maybe<Scalars['Int']>;
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
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  createEvent: Event;
  updateEvent?: Maybe<Event>;
  deleteEvent: Scalars['Boolean'];
  addAttendee: User;
  createClub: Club;
  updateClub?: Maybe<Club>;
  deleteClub: Scalars['Boolean'];
  followClub: Scalars['Boolean'];
  unfollowClub: Scalars['Boolean'];
  addRequestedMember: Scalars['Boolean'];
  addAdmin: Scalars['Boolean'];
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


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
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


export type MutationAddAttendeeArgs = {
  eventId: Scalars['Int'];
};


export type MutationCreateClubArgs = {
  input: ClubInput;
};


export type MutationUpdateClubArgs = {
  input: ClubInput;
  clubId: Scalars['Float'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['Float'];
};


export type MutationFollowClubArgs = {
  followerId: Scalars['Float'];
  clubId: Scalars['Float'];
};


export type MutationUnfollowClubArgs = {
  followerId: Scalars['Float'];
  clubId: Scalars['Float'];
};


export type MutationAddRequestedMemberArgs = {
  requestedMemberId: Scalars['Float'];
  clubId: Scalars['Float'];
};


export type MutationAddAdminArgs = {
  adminId: Scalars['Float'];
  clubId: Scalars['Float'];
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

export type PublicityType = {
  __typename?: 'PublicityType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  userByUsername?: Maybe<User>;
  myFeed: Array<Event>;
  events: Array<Event>;
  event?: Maybe<Event>;
  feed: Array<Event>;
  clubs: Array<Club>;
  club: Club;
  publicityTypes: Array<PublicityType>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryFeedArgs = {
  id: Scalars['Float'];
};


export type QueryClubArgs = {
  clubId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Post;
  events?: Maybe<Array<Event>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  followingClubs?: Maybe<Array<Club>>;
  adminClubs?: Maybe<Array<Club>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type DetailedEventFragment = { __typename?: 'Event', id: number, title: string, description: string, location: string, startTime: string, capacity?: Maybe<number>, endTime: string, hostId: number, clubId?: Maybe<number>, points: number, creatorTypeId: number, publicityTypeId: number, createdAt: string, updatedAt: string, club?: Maybe<{ __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }>, host: { __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> };

export type RegularClubFragment = { __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> };

export type RegularErrorFragment = { __typename?: 'FieldError', message: string, field: string };

export type RegularEventFragment = { __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> };

export type AddAttendeeMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type AddAttendeeMutation = { __typename?: 'Mutation', addAttendee: { __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> } };

export type AddRequestedMemberMutationVariables = Exact<{
  userId: Scalars['Float'];
  clubId: Scalars['Float'];
}>;


export type AddRequestedMemberMutation = { __typename?: 'Mutation', addRequestedMember: boolean };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> } };

export type CreateClubMutationVariables = Exact<{
  input: ClubInput;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> } };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> } };

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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> } };

export type UnfollowClubMutationVariables = Exact<{
  followerId: Scalars['Float'];
  clubId: Scalars['Float'];
}>;


export type UnfollowClubMutation = { __typename?: 'Mutation', unfollowClub: boolean };

export type UpdateClubMutationVariables = Exact<{
  input: ClubInput;
  clubId: Scalars['Float'];
}>;


export type UpdateClubMutation = { __typename?: 'Mutation', updateClub?: Maybe<{ __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type UpdateEventMutationVariables = Exact<{
  input: EventInput;
  id: Scalars['Float'];
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: Maybe<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type ClubQueryVariables = Exact<{
  clubId: Scalars['Float'];
}>;


export type ClubQuery = { __typename?: 'Query', club: { __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }>>, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> } };

export type ClubsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClubsQuery = { __typename?: 'Query', clubs: Array<{ __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type EventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventQuery = { __typename?: 'Query', event?: Maybe<{ __typename?: 'Event', id: number, title: string, description: string, location: string, startTime: string, capacity?: Maybe<number>, endTime: string, hostId: number, clubId?: Maybe<number>, points: number, creatorTypeId: number, publicityTypeId: number, createdAt: string, updatedAt: string, club?: Maybe<{ __typename?: 'Club', id: number, name: string, email: string, phoneNumber: string, description: string, createdAt: string, updatedAt: string, admins: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, followers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, members: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }>, requestedMembers: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }>, host: { __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type FeedQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> };

export type MyFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFeedQuery = { __typename?: 'Query', myFeed: Array<{ __typename?: 'Event', id: number, title: string, description: string, location: string, capacity?: Maybe<number>, startTime: string, endTime: string, hostId: number, points: number, creatorTypeId: number, publicityTypeId: number, clubId?: Maybe<number>, createdAt: string, updatedAt: string, host: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string }, attendees: Array<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> }> };

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: number, description: string, title: string, creatorId: number, createdAt: string, points: number, updatedAt: string, descriptionSnippet: string, creator: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } }> };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, description: string, title: string, creatorId: number, createdAt: string, points: number, updatedAt: string, descriptionSnippet: string, creator: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } }> } };

export type PublicityTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicityTypesQuery = { __typename?: 'Query', publicityTypes: Array<{ __typename?: 'PublicityType', id: number, name: string }> };

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', userByUsername?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, firstname: string, lastname: string, events?: Maybe<Array<{ __typename?: 'Event', id: number, title: string }>>, followingClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>>, adminClubs?: Maybe<Array<{ __typename?: 'Club', id: number, name: string, email: string }>> }> };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  firstname
  lastname
  events {
    id
    title
  }
  followingClubs {
    id
    name
    email
  }
  adminClubs {
    id
    name
    email
  }
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
  members {
    ...RegularUser
  }
  requestedMembers {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const DetailedEventFragmentDoc = gql`
    fragment DetailedEvent on Event {
  id
  title
  description
  location
  startTime
  capacity
  endTime
  hostId
  clubId
  points
  creatorTypeId
  publicityTypeId
  createdAt
  updatedAt
  club {
    ...RegularClub
  }
  host {
    ...RegularUser
  }
  attendees {
    ...RegularUser
  }
}
    ${RegularClubFragmentDoc}
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
  creatorTypeId
  publicityTypeId
  clubId
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
export const AddRequestedMemberDocument = gql`
    mutation AddRequestedMember($userId: Float!, $clubId: Float!) {
  addRequestedMember(requestedMemberId: $userId, clubId: $clubId)
}
    `;

export function useAddRequestedMemberMutation() {
  return Urql.useMutation<AddRequestedMemberMutation, AddRequestedMemberMutationVariables>(AddRequestedMemberDocument);
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
export const UnfollowClubDocument = gql`
    mutation UnfollowClub($followerId: Float!, $clubId: Float!) {
  unfollowClub(followerId: $followerId, clubId: $clubId)
}
    `;

export function useUnfollowClubMutation() {
  return Urql.useMutation<UnfollowClubMutation, UnfollowClubMutationVariables>(UnfollowClubDocument);
};
export const UpdateClubDocument = gql`
    mutation UpdateClub($input: ClubInput!, $clubId: Float!) {
  updateClub(input: $input, clubId: $clubId) {
    ...RegularClub
  }
}
    ${RegularClubFragmentDoc}`;

export function useUpdateClubMutation() {
  return Urql.useMutation<UpdateClubMutation, UpdateClubMutationVariables>(UpdateClubDocument);
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
export const ClubDocument = gql`
    query Club($clubId: Float!) {
  club(clubId: $clubId) {
    ...RegularClub
    events {
      ...RegularEvent
    }
  }
}
    ${RegularClubFragmentDoc}
${RegularEventFragmentDoc}`;

export function useClubQuery(options: Omit<Urql.UseQueryArgs<ClubQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ClubQuery>({ query: ClubDocument, ...options });
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
export const EventDocument = gql`
    query Event($id: Int!) {
  event(id: $id) {
    ...DetailedEvent
  }
}
    ${DetailedEventFragmentDoc}`;

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventQuery>({ query: EventDocument, ...options });
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
export const FeedDocument = gql`
    query Feed($id: Float!) {
  feed(id: $id) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useFeedQuery(options: Omit<Urql.UseQueryArgs<FeedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FeedQuery>({ query: FeedDocument, ...options });
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
export const MyFeedDocument = gql`
    query MyFeed {
  myFeed {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useMyFeedQuery(options: Omit<Urql.UseQueryArgs<MyFeedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyFeedQuery>({ query: MyFeedDocument, ...options });
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
export const PublicityTypesDocument = gql`
    query PublicityTypes {
  publicityTypes {
    id
    name
  }
}
    `;

export function usePublicityTypesQuery(options: Omit<Urql.UseQueryArgs<PublicityTypesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PublicityTypesQuery>({ query: PublicityTypesDocument, ...options });
};
export const UserByUsernameDocument = gql`
    query userByUsername($username: String!) {
  userByUsername(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useUserByUsernameQuery(options: Omit<Urql.UseQueryArgs<UserByUsernameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByUsernameQuery>({ query: UserByUsernameDocument, ...options });
};