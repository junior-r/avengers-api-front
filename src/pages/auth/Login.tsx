import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Link, useNavigate } from 'react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginSchema } from '@schemas/auth/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { login } from '@/actions/auth/login'
import ErrorForm from '@/components/custom/ErrorForm'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { useResponseStatusStore } from '@/store/api/useResponseStatus'
import { toast } from 'sonner'

export default function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser)
  const errorStatus = useResponseStatusStore((state) => state.errorStatus)
  const setError = useResponseStatusStore((state) => state.setError)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    const res = await login(data)

    if (res.error) {
      setError(res.error)
      return
    }

    if (res.status === 200) {
      const { user, message } = res.data
      toast.success(message)
      // Redirect to home page or dashboard
      setUser(user)
      navigate('/')
    }
  }

  return (
    <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <Card className="relative">
        <ModeToggle className="absolute right-4 top-4 z-10" />
        <Button asChild variant={'ghost'} className="absolute left-4 top-4 z-10">
          <Link to="/">
            <ArrowLeft />
          </Link>
        </Button>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
                defaultValue={''}
              />
              {errors.email && <ErrorForm message={errors.email.message || ''} />}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" {...register('password')} defaultValue={''} />
              {errors.password && <ErrorForm message={errors.password.message || ''} />}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {errorStatus.error && <ErrorForm message={errorStatus.message} />}

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/auth/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
