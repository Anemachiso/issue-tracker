'use client'

import { Button, TextField } from '@radix-ui/themes'
import dynamic from "next/dynamic";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface issueForm {
  tittle: string;
  description: string;
}

const NewIssuePage = () => {

  const router = useRouter();
  const {register, control, handleSubmit} = useForm<issueForm>();

  const onSubmit = async (data: issueForm) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full"
        {...register("tittle", { required: true })}
      />
        <Controller 
          name="description"
          control={control}
          render={({ field }) => <SimpleMdeReact placeholder="Descripion" {...field}/>}
        />
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage;