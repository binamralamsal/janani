import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { loginUserSchema } from "../auth.schema";
import { loginUserFn } from "../server/functions/user";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginForm({ redirectUrl }: { redirectUrl?: string }) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: useServerFn(loginUserFn),
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginUserSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await mutation.mutateAsync({ data: value });

      if (response.status === "SUCCESS") {
        toast.success(response.message);
        navigate({
          href: redirectUrl || "/",
        });
      } else {
        toast.error(response.message);
      }
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form.AppForm>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <form.AppField
                    name="email"
                    children={(field) => (
                      <field.FormItem>
                        <field.FormLabel>Email</field.FormLabel>
                        <field.FormControl>
                          <Input
                            type="email"
                            placeholder="email@website.com"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </field.FormControl>
                        <field.FormMessage />
                      </field.FormItem>
                    )}
                  />

                  <form.AppField
                    name="password"
                    children={(field) => (
                      <field.FormItem>
                        <div className="flex items-center">
                          <field.FormLabel>Password</field.FormLabel>
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <field.FormControl>
                          <PasswordInput
                            placeholder="********"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </field.FormControl>
                        <field.FormMessage />
                      </field.FormItem>
                    )}
                  />

                  <form.Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending && (
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                    )}
                    Login
                  </form.Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </form.AppForm>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
