import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateTokenSchema } from '@/schemas/token'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorForm from '@/components/custom/ErrorForm'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { createToken } from '@/actions/token'
import { useResponseStatusStore } from '@/store/api/useResponseStatus'
import { toast } from 'sonner'

function CreateToken() {
  const [charCount, setCharCount] = useState(0)
  const user = useAuthStore((state) => state.user)
  const errorStatus = useResponseStatusStore((state) => state.errorStatus)
  const setError = useResponseStatusStore((state) => state.setError)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof CreateTokenSchema>>({
    resolver: zodResolver(CreateTokenSchema),
    defaultValues: {
      description: '',
      activeDays: 0,
    },
  })

  const handleCheckboxChange = (e: boolean) => {
    const expireBox = document.getElementById('expireBox')
    if (!expireBox) return

    if (e) {
      expireBox.classList.replace('hidden', 'grid')
    } else {
      expireBox.classList.replace('grid', 'hidden')
    }
    return
  }

  const onSubmit: SubmitHandler<z.infer<typeof CreateTokenSchema>> = async (data) => {
    if (!user) return
    const res = await createToken(user.id, data)

    if (res.error) {
      setError(res.error)
      return
    }

    if (res.status === 200) {
      const { message } = res.data
      toast.success(message)
      return
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ms-auto bg-blue-500 text-white dark:bg-yellow-400 dark:text-black cursor-pointer flex gap-2 items-center">
          <PlusIcon />
          <span>Generate Token</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a new token</DialogTitle>
          <DialogDescription>You are about to generate a new token.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">What this token is for</Label>
            <Textarea
              placeholder="Type a short description"
              id="description"
              className="field-sizing-content"
              {...(register('description'),
              {
                onChange: (e) => {
                  setCharCount(e.target.value.length)
                },
              })}
            />
            <p className="text-sm text-muted-foreground" id="description-count">
              {charCount}/50
            </p>
            {errors.description && <ErrorForm message={errors.description.message || ''} />}
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox id="will-it-expire" onCheckedChange={handleCheckboxChange} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="will-it-expire"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Will it expire?
              </label>
            </div>
          </div>
          <div className="w-full gap-1.5 hidden" id="expireBox">
            <Label htmlFor="activeDays">Active days</Label>
            <Input
              placeholder="After this days will expire"
              id="activeDays"
              type="number"
              {...register('activeDays')}
            />
            <p className="text-sm text-muted-foreground" id="description-count">
              0 means no expiration. (from 1 to 365)
            </p>
            {errors.activeDays && <ErrorForm message={errors.activeDays.message || ''} />}
          </div>

          {errorStatus.error && <ErrorForm message={errorStatus.message} />}

          <Button disabled={isLoading}>{isLoading ? 'Loading...' : 'Generate'}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateToken
