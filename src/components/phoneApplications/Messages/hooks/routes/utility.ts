import { AbstractDigestedRouteType } from "./types";

export const createRouteKey = (route: AbstractDigestedRouteType) =>
  `${route.name}-${route.id}`;
