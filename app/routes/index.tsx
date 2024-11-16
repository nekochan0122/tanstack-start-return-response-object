import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

const serverFn = createServerFn({ method: "POST" }).handler(async () => {
  return new Response(JSON.stringify({ hello: "world" }), {
    status: 200,
    headers: {
      "Set-Cookie": "test=test",
    },
  });
});

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const serverFnMutation = useMutation({
    mutationFn: serverFn,
  });

  function handleServerFn() {
    serverFnMutation.mutate(undefined, {
      onSuccess: console.log,
    });
  }

  return <button onClick={handleServerFn}>Trigger serverFn</button>;
}
