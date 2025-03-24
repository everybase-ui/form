import { createContext, useContext, useMemo, useState } from "react"

type RenderAction<Args extends unknown[]> = React.ReactNode | ((...args: Args) => React.ReactNode)

export interface FormObject<Values> {
  values: Values | undefined
  submit: () => void
}

export interface FormProps<Values> {
  onSubmit: () => void
  children: RenderAction<[FormObject<Values>]>
}

export interface FieldObject {
  name: string
  value: string
  setValue: (value: string) => void
}

export interface FieldProps {
  name: string
  children: (field: FieldObject) => React.ReactNode
}

function createForm<Values>() {
  const FormContext = createContext<FormObject<Values> | undefined>(undefined)
  
  function useForm() {
    const form = useContext(FormContext)
    if (!form) throw ''
    return form
  }

  function Form({ onSubmit, children }: FormProps<Values>) {
    const [values] = useState<Values>()
    
    const form = useMemo<FormObject<Values>>(() => ({
      values,
      submit() { onSubmit() }
    }), [values, onSubmit])

    return (
      <FormContext value={form}>
        {typeof children === 'function' ? children(form) : children}
      </FormContext>
    )
  }

  function Field({ name, children }: FieldProps) {
    const { values } = useForm()
    const value = values
    const field = useMemo<FieldObject>(() => ({
      name,
      value: '',
      setValue: () => {}
    }), [name])

    return children(field) 
  }

  Form.useForm = useForm
  Form.Field = Field

  return Form
}

export default createForm