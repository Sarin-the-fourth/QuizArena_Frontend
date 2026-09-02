import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth.service";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import type { loginDTO } from "@/types/auth.type";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<loginDTO>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (res) => {
      toast.add({
        timeout: 3000,
        type: "success",
        description: `${res.data.message}`,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response.data.message ?? "Something went wrong");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="750"
      className="flex items-center font-Outfit justify-center h-screen"
    >
      <Card className="flex text-start w-full max-w-sm hover:shadow-lg duration-300 transition-shadow">
        <CardHeader>
          <CardTitle className="font-Outfit text-xl">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="JohnDoe@gmail.com"
                />
              </div>
              {/* inputs */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password..."
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {/* buttons */}
              <div className="grid gap-4">
                <Button type="submit" disabled={loginMutation.isPending}>
                  Login
                </Button>
                <span className="text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-400 duration-75 transition-colors underline"
                  >
                    Create Account
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

export default LoginPage;
