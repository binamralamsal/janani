import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute().methods({
  GET: () => {
    return json({ message: 'Hello "/api/hello"!' });
  },
});
