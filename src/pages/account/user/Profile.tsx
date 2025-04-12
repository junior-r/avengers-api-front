import { updateUser } from '@/actions/account/user'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { ProfileSchema } from '@/schemas/user'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import ErrorForm from '@/components/custom/ErrorForm'
import SuccessForm from '@/components/custom/SuccessForm'

function Profile() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  useRequireAuth()

  const [responseStatus, setResponseStatus] = useState({
    error: false,
    success: false,
    message: '',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name,
      lastName: user?.lastName,
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof ProfileSchema>> = async (data) => {
    if (!user) return
    const res = await updateUser(user.id, data)
    console.log(res)

    if (res.error) {
      setResponseStatus({ error: true, success: false, message: res.error })
      return
    }

    if (res.status === 200) {
      setResponseStatus({ error: false, success: true, message: 'User updated successfully!' })
      setUser(res.data)
    }
  }

  return (
    <section className="w-full h-full py-6">
      <form className="w-full max-w-screen-2xl mx-auto space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6 items-center justify-center flex-wrap">
          <div className="flex-1">
            <Label htmlFor="firstName" className="mb-2">
              First name
            </Label>
            <Input id="firstName" placeholder="John" {...register('name')} />
            {errors.name && <ErrorForm message={errors.name.message || ''} />}
          </div>
          <div className="flex-1">
            <Label htmlFor="lastName" className="mb-2">
              Last name
            </Label>
            <Input id="lastName" placeholder="Doe" {...register('lastName')} />
            {errors.lastName && <ErrorForm message={errors.lastName.message || ''} />}
          </div>
        </div>
        {responseStatus.error && <ErrorForm message={responseStatus.message} />}
        {responseStatus.success && <SuccessForm message={responseStatus.message} />}

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </form>
    </section>
  )
}

export default Profile
