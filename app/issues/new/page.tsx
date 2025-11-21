'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from "next/dynamic";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import z from 'zod';


const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

  const [error, setError] = useState('');

  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError('An unexpected error occured!!')
    }
  };

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
          <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          {...register("tittle", { required: true })}
          />
          {errors.tittle && <Text color='red' as='p'>{errors.tittle.message}</Text>}
          <Controller 
            name="description"
            control={control}
            render={({ field }) => <SimpleMdeReact placeholder="Descripion" {...field}/>}
          />
          {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage;