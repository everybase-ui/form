import Form from '@everybase/form'

const Basic = () => {
  return (
    <Form
      onSubmit={console.log}
    >
      {({ submit }) => (
        <form
          className='grid grid-cols-1 gap-6'
          onSubmit={e => {
            e.preventDefault()
            submit()
          }}
        >
          <Form.Field name='email'>
            {({ name, value, setValue }) => (
              <label className='block'>
                <span className='text-gray-700'>Email</span>
                <input 
                  type='email' 
                  placeholder='john@example.com' 
                  className='block mt-1 w-full' 
                  name={name}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </label>
            )}
          </Form.Field>


          <Form.Field name='password'>
            {({ name, value, setValue }) => (
              <label className='block'>
                <span className='text-gray-700'>Password</span>
                <input 
                  type='password' 
                  className='block mt-1 w-full' 
                  name={name}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </label>
            )}
          </Form.Field>

          <div>
            <button type='submit' className='bg-gray-900 text-white px-3 py-2'>Login</button>
          </div>
        </form>
      )}
    </Form>
  )
}

Basic.title = "Basic"
Basic.description = "Simple login form"

export default Basic