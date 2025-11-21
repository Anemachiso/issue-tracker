'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMdeReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
          <TextField.Root placeholder='Title'/>
        </TextField.Root>
        <SimpleMdeReact placeholder="Descripion" />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage;