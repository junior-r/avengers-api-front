import { useRequireAuth } from '@/hooks/useRequireAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ChangePasswordSchema } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorForm from '@/components/custom/ErrorForm'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { changePassword } from '@/actions/account/user'
import { useResponseStatusStore } from '@/store/api/useResponseStatus'
import { toast } from 'sonner'

function ChangePassword() {
  useRequireAuth()
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const errorStatus = useResponseStatusStore((state) => state.errorStatus)
  const setError = useResponseStatusStore((state) => state.setError)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof ChangePasswordSchema>> = async (data) => {
    if (!user) return
    const res = await changePassword(user.id, data)

    if (res.error) {
      setError(res.error)
      return
    }

    if (res.status === 200) {
      const { message } = res.data
      toast.success(message)
      setUser(null)
      return
    }
  }

  return (
    <section className="w-full h-full py-6">
      <form className="w-full max-w-screen-2xl mx-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-1">
          <Label htmlFor="currentPassword" className="mb-2">
            Current password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="••••••"
            {...register('currentPassword')}
          />
          {errors.currentPassword && <ErrorForm message={errors.currentPassword.message || ''} />}
        </div>
        <div className="flex gap-6 items-start justify-center flex-wrap">
          <div className="flex-1">
            <Label htmlFor="password" className="mb-2">
              New password
            </Label>
            <Input id="password" type="password" placeholder="••••••" {...register('password')} />
            {errors.password && <ErrorForm message={errors.password.message || ''} />}
          </div>
          <div className="flex-1">
            <Label htmlFor="passwordConfirm" className="mb-2">
              Confirm new password
            </Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="••••••"
              {...register('passwordConfirm')}
            />
            {errors.passwordConfirm && <ErrorForm message={errors.passwordConfirm.message || ''} />}
          </div>
        </div>

        {errorStatus.error && <ErrorForm message={errorStatus.message} />}

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </form>
    </section>
  )
}

export default ChangePassword
