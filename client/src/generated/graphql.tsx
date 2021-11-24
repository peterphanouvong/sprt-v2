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

export type Attendee = {
  __typename?: 'Attendee';
  id: Scalars['Int'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  beemId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AttendeeInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  beemId: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['Int'];
  title: Scalars['String'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  youtubeLink?: Maybe<Scalars['String']>;
  logoImageLink?: Maybe<Scalars['String']>;
  bannerImageLink?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  clubBeemId: Scalars['String'];
  attendeeConnection: Array<EventAttendee>;
  ownerId: Scalars['Float'];
  owner: User;
  attendees: Array<Attendee>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  level?: Maybe<Scalars['String']>;
  mixed?: Maybe<Scalars['String']>;
  numConfirmed: Scalars['Int'];
  numWaitlist: Scalars['Int'];
};

export type EventAttendee = {
  __typename?: 'EventAttendee';
  eventId: Scalars['Float'];
  attendeeId: Scalars['Float'];
  isConfirmed?: Maybe<Scalars['Boolean']>;
};

export type EventInput = {
  title?: Maybe<Scalars['String']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  clubBeemId?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  youtubeLink?: Maybe<Scalars['String']>;
};

export type EventTemplate = {
  __typename?: 'EventTemplate';
  templateName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  title: Scalars['String'];
  date?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  youtubeLink?: Maybe<Scalars['String']>;
  logoImageLink?: Maybe<Scalars['String']>;
  bannerImageLink?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  clubBeemId?: Maybe<Scalars['String']>;
  owner: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  level?: Maybe<Scalars['String']>;
  mixed?: Maybe<Scalars['String']>;
};

export type EventTemplateInput = {
  templateName: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Float']>;
  clubBeemId?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  youtubeLink?: Maybe<Scalars['String']>;
  logoImageLink?: Maybe<Scalars['String']>;
  bannerImageLink?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAttendee: Attendee;
  attendeeExists: Scalars['Boolean'];
  createEvent: Event;
  updateEvent: Event;
  addNewAttendee: Scalars['Boolean'];
  addExistingAttendee: Scalars['Boolean'];
  markEventAsComplete: Event;
  deleteEvent: Scalars['Boolean'];
  createEventTemplate: EventTemplate;
  deleteEventTemplate: Scalars['Boolean'];
  updateEventTemplate?: Maybe<EventTemplate>;
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


export type MutationCreateAttendeeArgs = {
  input: AttendeeInput;
};


export type MutationAttendeeExistsArgs = {
  phoneNumber: Scalars['String'];
};


export type MutationCreateEventArgs = {
  input: EventInput;
};


export type MutationUpdateEventArgs = {
  input: EventInput;
  id: Scalars['String'];
};


export type MutationAddNewAttendeeArgs = {
  input: AttendeeInput;
  id: Scalars['Float'];
};


export type MutationAddExistingAttendeeArgs = {
  attendeeId: Scalars['Float'];
  id: Scalars['Float'];
};


export type MutationMarkEventAsCompleteArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};


export type MutationCreateEventTemplateArgs = {
  input: EventTemplateInput;
};


export type MutationDeleteEventTemplateArgs = {
  templateId: Scalars['Float'];
};


export type MutationUpdateEventTemplateArgs = {
  input: EventTemplateInput;
  id: Scalars['Float'];
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
  attendees: Array<Attendee>;
  attendee: Attendee;
  event: Event;
  events: Array<Event>;
  liveEvents: Array<Event>;
  pastEvents: Array<Event>;
  eventTemplates: Array<EventTemplate>;
  eventTemplate: EventTemplate;
  quickEvent?: Maybe<QuickEvent>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  userByClubName?: Maybe<User>;
};


export type QueryAttendeeArgs = {
  id: Scalars['String'];
};


export type QueryEventArgs = {
  id: Scalars['String'];
};


export type QueryEventTemplateArgs = {
  id: Scalars['Float'];
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
  eventAttendees: Array<Attendee>;
  newQuickEvent: QuickEvent;
};


export type SubscriptionEventAttendeesArgs = {
  id: Scalars['Float'];
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
  events?: Maybe<Array<Event>>;
  eventTemplates?: Maybe<Array<EventTemplate>>;
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

export type RegularEventFragment = { __typename?: 'Event', id: number, title: string, date?: Maybe<string>, capacity?: Maybe<number>, numWaitlist: number, numConfirmed: number };

export type RegularEventTemplateFragment = { __typename?: 'EventTemplate', templateName?: Maybe<string>, id: number, title: string, date?: Maybe<string>, startTime?: Maybe<string>, endTime?: Maybe<string>, venue?: Maybe<string>, address?: Maybe<string>, price?: Maybe<number>, description?: Maybe<string>, youtubeLink?: Maybe<string>, logoImageLink?: Maybe<string>, bannerImageLink?: Maybe<string>, capacity?: Maybe<number>, clubBeemId?: Maybe<string>, createdAt: string, updatedAt: string, level?: Maybe<string>, mixed?: Maybe<string> };

export type RegularUserFragment = { __typename?: 'User', id: number, clubName: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> };

export type AddNewAttendeeMutationVariables = Exact<{
  input: AttendeeInput;
  eventId: Scalars['Float'];
}>;


export type AddNewAttendeeMutation = { __typename?: 'Mutation', addNewAttendee: boolean };

export type AttendeeExistsMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type AttendeeExistsMutation = { __typename?: 'Mutation', attendeeExists: boolean };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> } };

export type CreateEventMutationVariables = Exact<{
  input: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: number, title: string, date?: Maybe<string>, capacity?: Maybe<number>, numWaitlist: number, numConfirmed: number } };

export type CreateEventTemplateMutationVariables = Exact<{
  input: EventTemplateInput;
}>;


export type CreateEventTemplateMutation = { __typename?: 'Mutation', createEventTemplate: { __typename?: 'EventTemplate', templateName?: Maybe<string>, id: number, title: string, date?: Maybe<string>, startTime?: Maybe<string>, endTime?: Maybe<string>, venue?: Maybe<string>, address?: Maybe<string>, price?: Maybe<number>, description?: Maybe<string>, youtubeLink?: Maybe<string>, logoImageLink?: Maybe<string>, bannerImageLink?: Maybe<string>, capacity?: Maybe<number>, clubBeemId?: Maybe<string>, createdAt: string, updatedAt: string, level?: Maybe<string>, mixed?: Maybe<string> } };

export type CreateQuickEventMutationVariables = Exact<{
  createQuickEventInput: QuickEventInput;
}>;


export type CreateQuickEventMutation = { __typename?: 'Mutation', createQuickEvent: { __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string, updatedAt: string } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: boolean };

export type DeleteEventTemplateMutationVariables = Exact<{
  templateId: Scalars['Float'];
}>;


export type DeleteEventTemplateMutation = { __typename?: 'Mutation', deleteEventTemplate: boolean };

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

export type MarkEventAsCompleteMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type MarkEventAsCompleteMutation = { __typename?: 'Mutation', markEventAsComplete: { __typename?: 'Event', id: number, title: string, date?: Maybe<string>, capacity?: Maybe<number>, numWaitlist: number, numConfirmed: number } };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', message: string, field: string }>>, user?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> } };

export type UpdateQuickEventMutationVariables = Exact<{
  updateQuickEventInput: QuickEventInput;
  updateQuickEventId: Scalars['Float'];
}>;


export type UpdateQuickEventMutation = { __typename?: 'Mutation', updateQuickEvent?: Maybe<{ __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string }> };

export type UpdateEventTemplateMutationVariables = Exact<{
  input: EventTemplateInput;
  updateEventTemplateId: Scalars['Float'];
}>;


export type UpdateEventTemplateMutation = { __typename?: 'Mutation', updateEventTemplate?: Maybe<{ __typename?: 'EventTemplate', templateName?: Maybe<string>, id: number, title: string, date?: Maybe<string>, startTime?: Maybe<string>, endTime?: Maybe<string>, venue?: Maybe<string>, address?: Maybe<string>, price?: Maybe<number>, description?: Maybe<string>, youtubeLink?: Maybe<string>, logoImageLink?: Maybe<string>, bannerImageLink?: Maybe<string>, capacity?: Maybe<number>, clubBeemId?: Maybe<string>, createdAt: string, updatedAt: string, level?: Maybe<string>, mixed?: Maybe<string> }> };

export type AttendeeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AttendeeQuery = { __typename?: 'Query', attendee: { __typename?: 'Attendee', id: number, firstname: string, lastname: string, email?: Maybe<string>, beemId: string, phoneNumber: string, createdAt: string, updatedAt: string } };

export type EventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', venue?: Maybe<string>, address?: Maybe<string>, startTime?: Maybe<string>, endTime?: Maybe<string>, clubBeemId: string, price?: Maybe<number>, youtubeLink?: Maybe<string>, id: number, title: string, date?: Maybe<string>, capacity?: Maybe<number>, numWaitlist: number, numConfirmed: number, owner: { __typename?: 'User', id: number, email: string, clubName: string }, attendees: Array<{ __typename?: 'Attendee', id: number, firstname: string, lastname: string, email?: Maybe<string>, phoneNumber: string, beemId: string, updatedAt: string, createdAt: string }> } };

export type EventTemplateQueryVariables = Exact<{
  eventTemplateId: Scalars['Float'];
}>;


export type EventTemplateQuery = { __typename?: 'Query', eventTemplate: { __typename?: 'EventTemplate', templateName?: Maybe<string>, id: number, title: string, date?: Maybe<string>, startTime?: Maybe<string>, endTime?: Maybe<string>, venue?: Maybe<string>, address?: Maybe<string>, price?: Maybe<number>, description?: Maybe<string>, youtubeLink?: Maybe<string>, logoImageLink?: Maybe<string>, bannerImageLink?: Maybe<string>, capacity?: Maybe<number>, clubBeemId?: Maybe<string>, createdAt: string, updatedAt: string, level?: Maybe<string>, mixed?: Maybe<string> } };

export type EventTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type EventTemplatesQuery = { __typename?: 'Query', eventTemplates: Array<{ __typename?: 'EventTemplate', templateName?: Maybe<string>, id: number, title: string, date?: Maybe<string>, startTime?: Maybe<string>, endTime?: Maybe<string>, venue?: Maybe<string>, address?: Maybe<string>, price?: Maybe<number>, description?: Maybe<string>, youtubeLink?: Maybe<string>, logoImageLink?: Maybe<string>, bannerImageLink?: Maybe<string>, capacity?: Maybe<number>, clubBeemId?: Maybe<string>, createdAt: string, updatedAt: string, level?: Maybe<string>, mixed?: Maybe<string> }> };

export type LiveEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type LiveEventsQuery = { __typename?: 'Query', liveEvents: Array<{ __typename?: 'Event', id: number, title: string, date?: Maybe<string>, capacity?: Maybe<number>, numWaitlist: number, numConfirmed: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, clubName: string, email: string }> };

export type PastEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type PastEventsQuery = { __typename?: 'Query', pastEvents: Array<{ __typename?: 'Event', id: number, title: string, date?: Maybe<string>, capacity?: Maybe<number>, numWaitlist: number, numConfirmed: number }> };

export type QuickEventQueryVariables = Exact<{
  quickEventId: Scalars['Int'];
}>;


export type QuickEventQuery = { __typename?: 'Query', quickEvent?: Maybe<{ __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string, updatedAt: string }> };

export type EventAttendeesSubscriptionVariables = Exact<{
  id: Scalars['Float'];
}>;


export type EventAttendeesSubscription = { __typename?: 'Subscription', eventAttendees: Array<{ __typename?: 'Attendee', id: number, firstname: string, lastname: string, email?: Maybe<string>, phoneNumber: string, beemId: string, updatedAt: string, createdAt: string }> };

export type NewQuickEventSubscriptionVariables = Exact<{
  newQuickEventId: Scalars['Float'];
}>;


export type NewQuickEventSubscription = { __typename?: 'Subscription', newQuickEvent: { __typename?: 'QuickEvent', id: number, title: string, description?: Maybe<string>, capacity?: Maybe<number>, users: string, createdAt: string, updatedAt: string } };

export const RegularEventFragmentDoc = gql`
    fragment RegularEvent on Event {
  id
  title
  date
  capacity
  numWaitlist
  numConfirmed
}
    `;
export const RegularEventTemplateFragmentDoc = gql`
    fragment RegularEventTemplate on EventTemplate {
  templateName
  id
  title
  date
  startTime
  endTime
  venue
  address
  price
  description
  youtubeLink
  logoImageLink
  bannerImageLink
  capacity
  clubBeemId
  createdAt
  updatedAt
  level
  mixed
}
    `;
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
export const AddNewAttendeeDocument = gql`
    mutation AddNewAttendee($input: AttendeeInput!, $eventId: Float!) {
  addNewAttendee(input: $input, id: $eventId)
}
    `;

export function useAddNewAttendeeMutation() {
  return Urql.useMutation<AddNewAttendeeMutation, AddNewAttendeeMutationVariables>(AddNewAttendeeDocument);
};
export const AttendeeExistsDocument = gql`
    mutation AttendeeExists($phoneNumber: String!) {
  attendeeExists(phoneNumber: $phoneNumber)
}
    `;

export function useAttendeeExistsMutation() {
  return Urql.useMutation<AttendeeExistsMutation, AttendeeExistsMutationVariables>(AttendeeExistsDocument);
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
export const CreateEventTemplateDocument = gql`
    mutation CreateEventTemplate($input: EventTemplateInput!) {
  createEventTemplate(input: $input) {
    ...RegularEventTemplate
  }
}
    ${RegularEventTemplateFragmentDoc}`;

export function useCreateEventTemplateMutation() {
  return Urql.useMutation<CreateEventTemplateMutation, CreateEventTemplateMutationVariables>(CreateEventTemplateDocument);
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
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: String!) {
  deleteEvent(id: $id)
}
    `;

export function useDeleteEventMutation() {
  return Urql.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument);
};
export const DeleteEventTemplateDocument = gql`
    mutation DeleteEventTemplate($templateId: Float!) {
  deleteEventTemplate(templateId: $templateId)
}
    `;

export function useDeleteEventTemplateMutation() {
  return Urql.useMutation<DeleteEventTemplateMutation, DeleteEventTemplateMutationVariables>(DeleteEventTemplateDocument);
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
export const MarkEventAsCompleteDocument = gql`
    mutation MarkEventAsComplete($id: Float!) {
  markEventAsComplete(id: $id) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useMarkEventAsCompleteMutation() {
  return Urql.useMutation<MarkEventAsCompleteMutation, MarkEventAsCompleteMutationVariables>(MarkEventAsCompleteDocument);
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
export const UpdateEventTemplateDocument = gql`
    mutation UpdateEventTemplate($input: EventTemplateInput!, $updateEventTemplateId: Float!) {
  updateEventTemplate(input: $input, id: $updateEventTemplateId) {
    ...RegularEventTemplate
  }
}
    ${RegularEventTemplateFragmentDoc}`;

export function useUpdateEventTemplateMutation() {
  return Urql.useMutation<UpdateEventTemplateMutation, UpdateEventTemplateMutationVariables>(UpdateEventTemplateDocument);
};
export const AttendeeDocument = gql`
    query Attendee($id: String!) {
  attendee(id: $id) {
    id
    firstname
    lastname
    email
    beemId
    phoneNumber
    createdAt
    updatedAt
  }
}
    `;

export function useAttendeeQuery(options: Omit<Urql.UseQueryArgs<AttendeeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AttendeeQuery>({ query: AttendeeDocument, ...options });
};
export const EventDocument = gql`
    query Event($id: String!) {
  event(id: $id) {
    ...RegularEvent
    venue
    address
    startTime
    endTime
    clubBeemId
    price
    youtubeLink
    owner {
      id
      email
      clubName
    }
    attendees {
      id
      firstname
      lastname
      email
      phoneNumber
      beemId
      updatedAt
      createdAt
    }
  }
}
    ${RegularEventFragmentDoc}`;

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventQuery>({ query: EventDocument, ...options });
};
export const EventTemplateDocument = gql`
    query EventTemplate($eventTemplateId: Float!) {
  eventTemplate(id: $eventTemplateId) {
    ...RegularEventTemplate
  }
}
    ${RegularEventTemplateFragmentDoc}`;

export function useEventTemplateQuery(options: Omit<Urql.UseQueryArgs<EventTemplateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventTemplateQuery>({ query: EventTemplateDocument, ...options });
};
export const EventTemplatesDocument = gql`
    query EventTemplates {
  eventTemplates {
    ...RegularEventTemplate
  }
}
    ${RegularEventTemplateFragmentDoc}`;

export function useEventTemplatesQuery(options: Omit<Urql.UseQueryArgs<EventTemplatesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventTemplatesQuery>({ query: EventTemplatesDocument, ...options });
};
export const LiveEventsDocument = gql`
    query LiveEvents {
  liveEvents {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useLiveEventsQuery(options: Omit<Urql.UseQueryArgs<LiveEventsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LiveEventsQuery>({ query: LiveEventsDocument, ...options });
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
export const PastEventsDocument = gql`
    query PastEvents {
  pastEvents {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function usePastEventsQuery(options: Omit<Urql.UseQueryArgs<PastEventsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PastEventsQuery>({ query: PastEventsDocument, ...options });
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
export const EventAttendeesDocument = gql`
    subscription eventAttendees($id: Float!) {
  eventAttendees(id: $id) {
    id
    firstname
    lastname
    email
    phoneNumber
    beemId
    updatedAt
    createdAt
  }
}
    `;

export function useEventAttendeesSubscription<TData = EventAttendeesSubscription>(options: Omit<Urql.UseSubscriptionArgs<EventAttendeesSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<EventAttendeesSubscription, TData>) {
  return Urql.useSubscription<EventAttendeesSubscription, TData, EventAttendeesSubscriptionVariables>({ query: EventAttendeesDocument, ...options }, handler);
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