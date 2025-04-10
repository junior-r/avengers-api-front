import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterSchema } from "@schemas/auth/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useState } from "react"
import { register as signUp } from "@/actions/auth/register"
import ErrorForm from "@/components/custom/ErrorForm"
import SuccessForm from "@/components/custom/SuccessForm"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isLoading } } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            lastName: "",
            confirmPassword: ""
        }
    })

    const onSubmit: SubmitHandler<z.infer<typeof RegisterSchema>> = async (data) => {
        const res = await signUp(data)
        console.log(res)
        if (res.error) {
            setError(res.error);
            setSuccess("");
            return;
        }

        if (res.status === 201) {
            setError("");
            setSuccess(res.success);
            // Redirect to home page or dashboard
            navigate("/")
            toast.success("Account created successfully.")
        }
    }

    return (
        <form className="w-full max-w-xl" onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-full relative">
                <ModeToggle className="absolute right-4 top-4 z-10" />
                <Button asChild variant={"ghost"} className="absolute left-4 top-4 z-10">
                    <Link to="/"><ArrowLeft /></Link>
                </Button>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                    <CardDescription className="text-center">
                        Create an account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" placeholder="John" {...register("name")} />
                                {errors.name && <ErrorForm message={errors.name.message || ""} />}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" placeholder="Doe" {...register("lastName")} />
                                {errors.lastName && <ErrorForm message={errors.lastName.message || ""} />}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                            {errors.email && <ErrorForm message={errors.email.message || ""} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && <ErrorForm message={errors.password.message || ""} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                            {errors.confirmPassword && <ErrorForm message={errors.confirmPassword.message || ""} />}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    {error && <ErrorForm message={error} />}
                    {success && <SuccessForm message={success} />}

                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </Button>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            Login
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}