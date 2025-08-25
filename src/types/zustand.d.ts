type ID = number

type RCE<T = HTMLInputElement> = React.ChangeEvent<T>

type FormStoreType<T = object> = {
  isChanged?: boolean
  form: Partial<T>
  error: Record<string, unknown>
}

type StoreTypeOptions = {
  isChanged?: boolean
}

type StoreType = {
  isChanged?: boolean
  setForm: (data: Record<string, unknown>) => void
  onChange: (e: RCE<HTMLInputElement | HTMLTextAreaElement>) => void
  onCheck?: (e: CheckboxChangeEvent_Type) => void
  setKeyValue: (key: string, value: unknown, options?: StoreTypeOptions) => void
  setError: (key: string, error: string) => void
  setErrors: (data?: Record<string, unknown>) => void
  resetErrors: (data?: Record<string, unknown>) => void
  reset: (data?: Record<string, unknown>) => void
  setChanged?: (isChanged?: boolean) => void
}