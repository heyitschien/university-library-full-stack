"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { UniversityCardUpload } from "@/components/auth/UniversityCardUpload";
import type { AuthFieldConfig } from "@/constants/auth";
import type { z } from "zod";

type AuthFormResult = {
  success: boolean;
  message?: string;
};

interface AuthFormProps {
  title: string;
  description: string;
  schema: z.ZodTypeAny;
  defaultValues: Record<string, string>;
  fields: AuthFieldConfig[];
  submitLabel: string;
  footer?: ReactNode;
  onSubmit: (values: Record<string, string>) => Promise<AuthFormResult>;
}

export function AuthForm({
  title,
  description,
  schema,
  defaultValues,
  fields,
  submitLabel,
  footer,
  onSubmit,
}: AuthFormProps) {
  type FormValues = Record<string, string>;
  const typedSchema = schema as z.ZodType<FormValues>;
  const form = useForm<FormValues>({
    resolver: zodResolver(typedSchema as any) as any,
    defaultValues: defaultValues as FormValues,
    mode: "onBlur",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(values);
      if (result.success) {
        toast.success(result.message || "Success");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_35px_90px_-50px_rgba(5,8,35,0.95)] backdrop-blur-lg sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Image src="/icons/logo.svg" alt="BookWise" width={36} height={30} />
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">BookWise</span>
        </div>

        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof FormValues}
                render={({ field: controller }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.component === "upload" ? (
                        <UniversityCardUpload
                          value={controller.value as string | undefined}
                          onChange={(val) => controller.onChange(val)}
                          helper={field.helper}
                        />
                      ) : (
                        <Input
                          type={field.type ?? "text"}
                          placeholder={field.placeholder}
                          autoComplete={
                            field.type === "password"
                              ? "current-password"
                              : undefined
                          }
                          {...controller}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="mt-2 w-full rounded-xl bg-primary font-semibold text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : submitLabel}
            </Button>
          </form>
        </Form>

        {footer ? (
          <div className="mt-5 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
