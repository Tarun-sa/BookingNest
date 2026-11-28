import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as ApiClient from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type SignInType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>();

  const mutation = useMutation({
    mutationFn: ApiClient.loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ValidateToken"],
      });
      toast.success("Logged In Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign in</h2>
      <label className=" text-sm font-bold text-gray-700 flex-1">
        Email
        <input
          type="email"
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 font-medium">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className=" text-sm font-bold text-gray-700 flex-1">
        Password
        <input
          type="password"
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
          })}
        />
        {errors.password && (
          <span className="text-red-500 font-medium">
            {errors.password.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="rounded-md bg-blue-600 hover:bg-blue-500 text-white p-2 font-bold "
        >
          Sign In
        </button>
      </span>
    </form>
  );
};

export default SignIn;
