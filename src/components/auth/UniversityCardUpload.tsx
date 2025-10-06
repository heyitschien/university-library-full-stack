"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UniversityCardUploadProps {
  value?: string;
  onChange: (value: string) => void;
  helper?: string;
  className?: string;
}

export function UniversityCardUpload({
  value,
  onChange,
  helper,
  className,
}: UniversityCardUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const supportedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ] as const;
    const isValidType = supportedMimeTypes.includes(
      file.type as (typeof supportedMimeTypes)[number],
    );
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!isValidType) {
      setError("Please upload a JPG, PNG, or WEBP image");
      onChange("");
      return;
    }

    if (file.size > maxSize) {
      setError("File exceeds the 20MB size limit");
      onChange("");
      return;
    }

    setError(null);
    onChange(file.name);
  };

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setError(null);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full justify-between rounded-xl border-white/10 bg-white/5 text-sm text-muted-foreground hover:bg-white/10"
        onClick={handleSelect}
      >
        <span>{value ? value : "Upload a file"}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M12 3V15M12 15L8 11M12 15L16 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 17V18C4 19.6569 5.34315 21 7 21H17C18.6569 21 20 19.6569 20 18V17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {value ? (
        <button
          type="button"
          className="text-xs text-primary underline"
          onClick={handleClear}
        >
          Remove file
        </button>
      ) : null}

      {helper ? (
        <p className="text-xs text-muted-foreground">{helper}</p>
      ) : null}
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
