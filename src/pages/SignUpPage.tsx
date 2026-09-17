import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/auth.service";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import type { signupDTO } from "@/types/auth.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/auth.schema";

type SignUpForm = signupDTO & {
  confirmPassword: string;
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    mutationKey: ["signup"],

    onSuccess: (res) => {
      toast.add({
        timeout: 3000,
        type: "success",
        description: res.data.message,
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      navigate("/");
    },

    onError: (error) => {
      if (!axios.isAxiosError(error)) {
        toast.add({
          timeout: 3000,
          type: "error",
          description: "Something went wrong!",
        });
        return;
      }

      const data = error.response?.data;

      if (data?.errors) {
        data.errors.forEach((err: { path: string[]; message: string }) => {
          const field = err.path[0];

          if (field) {
            form.setError(field as keyof SignUpForm, {
              type: "server",
              message: err.message,
            });
          }
        });

        return;
      }

      toast.add({
        timeout: 3000,
        type: "error",
        description: data?.message ?? "Something went wrong!",
      });
    },
  });

  const onSubmit = (data: SignUpForm) => {
    const { confirmPassword, ...signupData } = data;

    signUpMutation.mutate(signupData);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="750"
      className="flex items-center justify-center h-screen font-Outfit"
    >
      <Card className="flex text-start w-full max-w-sm hover:shadow-lg duration-300 transition-shadow">
        <CardHeader>
          <CardTitle className="font-Outfit text-xl">
            Create an Account
          </CardTitle>

          <CardDescription>
            Join Quiz Arena and put your knowledge to the test.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="text"
                  placeholder="JohnDoe@gmail.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password..."
                    {...form.register("password")}
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>

                <InputGroup>
                  <InputGroupInput
                    id="confrimPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password..."
                    {...form.register("confirmPassword")}
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="grid gap-4">
                <Button type="submit" disabled={signUpMutation.isPending}>
                  {signUpMutation.isPending ? "Creating account..." : "Sign up"}
                </Button>

                <span className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-400 duration-75 transition-colors underline"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
