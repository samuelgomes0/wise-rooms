import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormField = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

function GenericForm({
  schema,
  fields,
  onSubmit,
  defaultValues,
}: {
  schema: z.ZodObject<any>;
  fields: FormField[];
  onSubmit: (data: any) => void;
  defaultValues: any;
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  function handleSubmit(data: any) {
    onSubmit(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: inputField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...inputField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    </Form>
  );
}

export default GenericForm;
