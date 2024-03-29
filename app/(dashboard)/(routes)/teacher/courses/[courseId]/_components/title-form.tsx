"use client"
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useForm} from 'react-hook-form';

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage 
} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import { Pencil } from "lucide-react";
interface TitleFormProps {
    initialData : {
        title: string ;
    };
    courseId: string;
}
  
const formSchema = z.object({
    title : z.string().min(1,{
        message: "Title is required",
    })
})

export const TitileForm = ({
initialData ,
courseId
} : TitleFormProps ) => {
    const [isEditing,setIsEditing] = useState(false) ;
    const toggleEdit = () => setIsEditing((current) => !current) ;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues: initialData ,
    });

    const {isSubmitting,isValid} =form.formState;
    const onSubmit = async (values : z.infer<typeof formSchema>) => {
       console.log(values)    ;
    }

    return (
        <div className="mt-6 bg-slate-100 round-md p-4">
            <div className=" font-medium flex items-center justify-between ">
                Course Title
              <Button onClick={toggleEdit} >
                {isEditing ? (
                    <>Cancel</>
                ):
                (
                <>
               <Pencil  className="h-4 w-4 mr-2"/>
               Edit Title
               </>)}
            </Button> 

            </div> 
            {!isEditing && (
                <p className="text-sm mt-2"> {initialData.title}</p>
            )}
        </div>
    )
}