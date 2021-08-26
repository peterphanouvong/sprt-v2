import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import router from "next/router";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import {
  AddAttendeeMutationVariables,
  DeleteClubMutationVariables,
  DeleteEventMutationVariables,
  DeletePostMutationVariables,
  EventsDocument,
  FollowClubMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        router.replace("/login");
      }
    })
  );
};

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const isItInTheCache = cache.resolve(
      cache.resolve(
        entityKey,
        `${fieldName}(${stringifyVariables(fieldArgs)})`
      ) as string,
      "posts"
    );

    info.partial = !isItInTheCache;

    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore: hasMore,
      posts: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            followClub: (_result, _args, cache, _info) => {
              cache.invalidate({
                __typename: "Club",
                id: (_args as FollowClubMutationVariables).clubId,
              });
            },
            unfollowClub: (_result, _args, cache, _info) => {
              cache.invalidate({
                __typename: "Club",
                id: (_args as FollowClubMutationVariables).clubId,
              });
            },
            addAttendee: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Event",
                id: (args as AddAttendeeMutationVariables).eventId,
              });
            },
            // createClub: (_result, args, cache, _info) => {
            // betterUpdateQuery<CreateClubMutation, ClubByAdminIdQuery>(
            //   cache,
            //   { query: ClubByAdminIdDocument, variables: { ...args } },
            //   _result,
            //   (result, query) => {
            //     console.log(args);
            //     console.log(result.createClub);
            //     return { clubByAdminId: result.createClub };
            //   }
            // );
            // cache.updateQuery({ query: ClubsDocument }, (data) => {
            //   console.log("DATA", data);
            //   //@ts-ignore
            //   data.clubs.push(result.createClub);
            //   return null;
            // });
            // },
            deleteClub: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Club",
                id: (args as DeleteClubMutationVariables).id,
              });
            },
            createEvent: (result, _args, cache, _info) => {
              cache.updateQuery({ query: EventsDocument }, (data) => {
                console.log("result", result);
                console.log("data", data);

                if (data === null) {
                  return data;
                }
                //@ts-ignore
                data.events.push(result.createEvent);
                return data;
              });
            },
            deleteEvent: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Event",
                id: (args as DeleteEventMutationVariables).id,
              });
            },
            deletePost: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },
            logout: (_result, _args, cache, _info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  console.log(query);
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, _args, cache, _info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
