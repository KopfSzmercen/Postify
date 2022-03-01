import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCommentInput = {
  postId: Scalars['Int'];
  text: Scalars['String'];
};

export type AddCommentResult = {
  __typename?: 'AddCommentResult';
  errors: Array<Scalars['String']>;
  returnedComment?: Maybe<PaginatedComment>;
  success: Scalars['Boolean'];
};

export type CreateFriendshipInput = {
  friend: Scalars['Int'];
};

export type CreatePostError = {
  __typename?: 'CreatePostError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CreatePostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostResult = {
  __typename?: 'CreatePostResult';
  errors: Array<CreatePostError>;
  success: Scalars['Boolean'];
};

export type FriendsRequest = {
  __typename?: 'FriendsRequest';
  createdAt: Scalars['String'];
  message: Scalars['String'];
  senderId: Scalars['Float'];
};

export type FriendsRequestsResult = {
  __typename?: 'FriendsRequestsResult';
  errors: Array<Scalars['String']>;
  requests: Array<FriendsRequest>;
  success: Scalars['Boolean'];
};

export type GetMoreCommentsInput = {
  cursor: Scalars['String'];
  postId: Scalars['Int'];
};

export type GetMoreCommentsResult = {
  __typename?: 'GetMoreCommentsResult';
  errors: Array<Scalars['String']>;
  hasMoreComments: Scalars['Boolean'];
  paginatedComments?: Maybe<Array<PaginatedComment>>;
  success: Scalars['Boolean'];
};

export type GetPaginatedPostsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type GetPaginatedPostsResult = {
  __typename?: 'GetPaginatedPostsResult';
  errors: Array<Scalars['String']>;
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
  success: Scalars['Boolean'];
};

export type GetSinglePostInput = {
  postId: Scalars['Int'];
};

export type GetSinglePostResult = {
  __typename?: 'GetSinglePostResult';
  errors: Array<Scalars['String']>;
  hasMoreComments: Scalars['Boolean'];
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type GetUsersByUsernameInput = {
  username: Scalars['String'];
};

export type GetUsersByUsernameResult = {
  __typename?: 'GetUsersByUsernameResult';
  errors?: Maybe<Array<Scalars['String']>>;
  success: Scalars['Boolean'];
  users: Array<UserProfile>;
};

export type GetUsersResult = {
  __typename?: 'GetUsersResult';
  errors?: Maybe<Array<Scalars['String']>>;
  hasMore: Scalars['Boolean'];
  success: Scalars['Boolean'];
  users: Array<UserProfile>;
};

export type LoginError = {
  __typename?: 'LoginError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  errors: Array<LoginError>;
  success: Scalars['Boolean'];
  userId?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type ManageFriendsRequestInput = {
  action: Scalars['String'];
  senderId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: AddCommentResult;
  createFriendship: RegularResult;
  createPost: CreatePostResult;
  login: LoginResult;
  manageFriendsRequest: RegularResult;
  register: RegisterResult;
  vote: VoteResult;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationCreateFriendshipArgs = {
  options: CreateFriendshipInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationManageFriendsRequestArgs = {
  options: ManageFriendsRequestInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationVoteArgs = {
  options: VoteInput;
};

export type PaginatedComment = {
  __typename?: 'PaginatedComment';
  creatorId: Scalars['Float'];
  creatorName: Scalars['String'];
  id: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  commentsNumber: Scalars['Float'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  paginatedComments?: Maybe<Array<PaginatedComment>>;
  points: Scalars['Float'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getMoreComments: GetMoreCommentsResult;
  getPaginatedPosts: GetPaginatedPostsResult;
  getSinglePost: GetSinglePostResult;
  getUsers: GetUsersResult;
  getUsersByUsername: GetUsersByUsernameResult;
  queryFriendsRequests: FriendsRequestsResult;
  sayHi: Scalars['String'];
};


export type QueryGetMoreCommentsArgs = {
  options: GetMoreCommentsInput;
};


export type QueryGetPaginatedPostsArgs = {
  options: GetPaginatedPostsInput;
};


export type QueryGetSinglePostArgs = {
  input: GetSinglePostInput;
};


export type QueryGetUsersArgs = {
  options: UsersOptions;
};


export type QueryGetUsersByUsernameArgs = {
  options: GetUsersByUsernameInput;
};

export type RegisterError = {
  __typename?: 'RegisterError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  errors: Array<RegisterError>;
  success: Scalars['Boolean'];
};

export type RegularResult = {
  __typename?: 'RegularResult';
  errors: Array<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  friendshipStatus: Scalars['String'];
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UsersOptions = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type VoteInput = {
  postId: Scalars['Int'];
  value: Scalars['Int'];
};

export type VoteResult = {
  __typename?: 'VoteResult';
  errors: Array<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PostFragmentFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, commentsNumber: number, paginatedComments?: Array<{ __typename?: 'PaginatedComment', id: number, text: string, updatedAt: string, creatorName: string, creatorId: number }> | null, creator: { __typename?: 'User', id: number, username: string } };

export type AddCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  text: Scalars['String'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: { __typename?: 'AddCommentResult', success: boolean, errors: Array<string>, returnedComment?: { __typename?: 'PaginatedComment', id: number, text: string, updatedAt: string, creatorName: string, creatorId: number } | null } };

export type CreateFriendshipMutationVariables = Exact<{
  friend: Scalars['Int'];
}>;


export type CreateFriendshipMutation = { __typename?: 'Mutation', createFriendship: { __typename?: 'RegularResult', success: boolean, errors: Array<string> } };

export type ManageFriendshipRequestMutationVariables = Exact<{
  senderId: Scalars['Int'];
  action: Scalars['String'];
}>;


export type ManageFriendshipRequestMutation = { __typename?: 'Mutation', manageFriendsRequest: { __typename?: 'RegularResult', success: boolean, errors: Array<string> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', success: boolean, username?: string | null, userId?: number | null, errors: Array<{ __typename?: 'LoginError', field: string, message: string }> } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResult', success: boolean, errors: Array<{ __typename?: 'RegisterError', field: string, message: string }> } };

export type VoteMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'VoteResult', success: boolean, errors: Array<string> } };

export type GetMoreCommentsQueryVariables = Exact<{
  postId: Scalars['Int'];
  cursor: Scalars['String'];
}>;


export type GetMoreCommentsQuery = { __typename?: 'Query', getMoreComments: { __typename?: 'GetMoreCommentsResult', success: boolean, errors: Array<string>, hasMoreComments: boolean, paginatedComments?: Array<{ __typename?: 'PaginatedComment', id: number, text: string, updatedAt: string, creatorName: string, creatorId: number }> | null } };

export type GetPaginatedPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetPaginatedPostsQuery = { __typename?: 'Query', getPaginatedPosts: { __typename?: 'GetPaginatedPostsResult', success: boolean, hasMore: boolean, posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, commentsNumber: number, paginatedComments?: Array<{ __typename?: 'PaginatedComment', id: number, text: string, updatedAt: string, creatorName: string, creatorId: number }> | null, creator: { __typename?: 'User', id: number, username: string } }> } };

export type GetSinglePostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetSinglePostQuery = { __typename?: 'Query', getSinglePost: { __typename?: 'GetSinglePostResult', success: boolean, errors: Array<string>, hasMoreComments: boolean, post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, title: string, text: string, points: number, voteStatus?: number | null, commentsNumber: number, paginatedComments?: Array<{ __typename?: 'PaginatedComment', id: number, text: string, updatedAt: string, creatorName: string, creatorId: number }> | null, creator: { __typename?: 'User', id: number, username: string } } | null } };

export type GetUsersByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUsersByUsernameQuery = { __typename?: 'Query', getUsersByUsername: { __typename?: 'GetUsersByUsernameResult', success: boolean, errors?: Array<string> | null, users: Array<{ __typename?: 'UserProfile', username: string, id: number, friendshipStatus: string }> } };

export type SayHiQueryVariables = Exact<{ [key: string]: never; }>;


export type SayHiQuery = { __typename?: 'Query', sayHi: string };

export type GetUsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'GetUsersResult', success: boolean, hasMore: boolean, users: Array<{ __typename?: 'UserProfile', id: number, username: string, friendshipStatus: string }> } };

export const PostFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"points"}},{"kind":"Field","name":{"kind":"Name","value":"voteStatus"}},{"kind":"Field","name":{"kind":"Name","value":"commentsNumber"}},{"kind":"Field","name":{"kind":"Name","value":"paginatedComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorName"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<PostFragmentFragment, unknown>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"returnedComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorName"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]}}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const CreateFriendshipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFriendship"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"friend"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFriendship"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"friend"},"value":{"kind":"Variable","name":{"kind":"Name","value":"friend"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<CreateFriendshipMutation, CreateFriendshipMutationVariables>;
export const ManageFriendshipRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ManageFriendshipRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manageFriendsRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"senderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<ManageFriendshipRequestMutation, ManageFriendshipRequestMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"confirmPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const VoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Vote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<VoteMutation, VoteMutationVariables>;
export const GetMoreCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMoreComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMoreComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"hasMoreComments"}},{"kind":"Field","name":{"kind":"Name","value":"paginatedComments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorName"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMoreCommentsQuery, GetMoreCommentsQueryVariables>;
export const GetPaginatedPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaginatedPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPaginatedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}}]}}]}},...PostFragmentFragmentDoc.definitions]} as unknown as DocumentNode<GetPaginatedPostsQuery, GetPaginatedPostsQueryVariables>;
export const GetSinglePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSinglePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSinglePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMoreComments"}}]}}]}},...PostFragmentFragmentDoc.definitions]} as unknown as DocumentNode<GetSinglePostQuery, GetSinglePostQueryVariables>;
export const GetUsersByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsersByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"friendshipStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>;
export const SayHiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SayHi"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sayHi"}}]}}]} as unknown as DocumentNode<SayHiQuery, SayHiQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"options"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"friendshipStatus"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;