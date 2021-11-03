import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import router from "next/router";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  dedupExchange,
  Exchange,
  stringifyVariables,
  subscriptionExchange,
} from "urql";
import { pipe, tap } from "wonka";
import {
  CreateEventMutation,
  DeleteEventMutationVariables,
  JoinQuickEventMutation,
  LiveEventsDocument,
  LiveEventsQuery,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  PastEventsDocument,
  PastEventsQuery,
  QuickEventDocument,
  QuickEventQuery,
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

let subscriptionClient;

if (process.browser) {
  subscriptionClient = new SubscriptionClient(
    //@ts-ignore
    process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL,
    {
      reconnect: true,
    }
  );
}

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
      subscriptionExchange({
        forwardSubscription: (operation) =>
          subscriptionClient.request(operation),
      }),
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
            deleteEvent: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: "Event",
                id: (args as DeleteEventMutationVariables).id,
              });
            },
            createEvent: (_result, _args, cache, _info) => {
              betterUpdateQuery<CreateEventMutation, LiveEventsQuery>(
                cache,
                {
                  query: LiveEventsDocument,
                },
                _result,
                (res, data) => {
                  return { liveEvents: [res.createEvent, ...data.liveEvents] };
                }
              );

              betterUpdateQuery<CreateEventMutation, PastEventsQuery>(
                cache,
                {
                  query: PastEventsDocument,
                },
                _result,
                (res, data) => {
                  return { pastEvents: [res.createEvent, ...data.pastEvents] };
                }
              );
            },
            joinQuickEvent: (_result, _args, cache, _info) => {
              betterUpdateQuery<JoinQuickEventMutation, QuickEventQuery>(
                cache,
                {
                  query: QuickEventDocument,
                  variables: { quickEventId: _args.id },
                },
                _result,
                (res, _) => {
                  return { quickEvent: res.joinQuickEvent };
                }
              );
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
      // fetchExchange,
      multipartFetchExchange,
    ],
  };
};
