"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Plus, Save, Trash2 } from "lucide-react";
import {
  getDefaultGraphicCollection,
  mergeGraphicCollection,
  type GraphicCollection,
} from "@/lib/portfolio-collection";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white/70 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)]/40";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id_${Date.now()}`;

const MAX_IMAGE_MB = 2;

const shouldUnoptimize = (src?: string) =>
  Boolean(src && (src.startsWith("data:") || src.startsWith("http")));

export default function AdminPortfolioPage() {
  const [collection, setCollection] = useState<GraphicCollection>(() => getDefaultGraphicCollection());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadCollection = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch("/api/admin/portfolio", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Failed to load portfolio collection.");
        }
        if (isMounted) {
          setCollection(mergeGraphicCollection(data?.collection));
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load portfolio collection.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCollection();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageFile = (file: File, onSuccess: (dataUrl: string) => void) => {
    if (!file) return;
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_IMAGE_MB) {
      setError(`Image too large. Please keep uploads under ${MAX_IMAGE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onSuccess(reader.result);
        setMessage("Image uploaded. Remember to save your changes.");
      }
    };
    reader.readAsDataURL(file);
  };

  const updateCollection = (updates: Partial<GraphicCollection>) => {
    setCollection((prev) => ({ ...prev, ...updates }));
  };

  const updateSubProject = (
    index: number,
    updates: Partial<GraphicCollection["subProjects"][number]>
  ) => {
    setCollection((prev) => {
      const next = [...prev.subProjects];
      next[index] = { ...next[index], ...updates };
      return { ...prev, subProjects: next };
    });
  };

  const addSlide = () => {
    setCollection((prev) => ({
      ...prev,
      subProjects: [
        ...prev.subProjects,
        { id: createId(), subTitle: "New graphic", subImage: "" },
      ],
    }));
  };

  const removeSlide = (index: number) => {
    setCollection((prev) => ({
      ...prev,
      subProjects: prev.subProjects.filter((_, idx) => idx !== index),
    }));
  };

  const saveCollection = async () => {
    setIsSaving(true);
    setMessage("");
    setError("");
    const normalized = mergeGraphicCollection(collection);
    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection: normalized }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to save portfolio collection.");
      }
      setCollection(normalized);
      setMessage("Portfolio collection saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save portfolio collection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="glass-panel p-6 sm:p-8 space-y-4">
          <div className="h-4 w-40 bg-[var(--border)]/50 rounded-full" />
          <div className="h-8 w-2/3 bg-[var(--border)]/60 rounded-full" />
          <div className="h-4 w-full bg-[var(--border)]/50 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--button-bg)] flex items-center gap-2">
              <ImageIcon size={16} />
              Portfolio Collection
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-2">
              Manage the Branding & Graphic Design gallery.
            </h1>
            <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
              Upload images and update the titles to keep the live collection in sync with the homepage
              and portfolio gallery.
            </p>
          </div>
          <button
            type="button"
            onClick={saveCollection}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--button-bg)] text-white text-sm font-semibold shadow-lg disabled:opacity-70"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : "Save collection"}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-sm text-emerald-600">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-sm text-rose-500">{error}</p>
        )}
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Collection Details</p>
          <h2 className="text-xl font-semibold mt-2">Headline copy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Collection title"
            value={collection.title}
            onChange={(event) => updateCollection({ title: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Category"
            value={collection.category}
            onChange={(event) => updateCollection({ category: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="CTA link (e.g. /portfolio)"
            value={collection.link}
            onChange={(event) => updateCollection({ link: event.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Tags (comma separated)"
            value={collection.tags.join(", ")}
            onChange={(event) =>
              updateCollection({
                tags: event.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              })
            }
          />
          <textarea
            className={`${inputClass} md:col-span-2 min-h-[120px]`}
            placeholder="Collection description"
            value={collection.description}
            onChange={(event) => updateCollection({ description: event.target.value })}
          />
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Hero Image</p>
          <h2 className="text-xl font-semibold mt-2">Main cover</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1fr] gap-6">
          <div className="relative w-full h-56 rounded-2xl border border-[var(--glass-border)] bg-white/60 overflow-hidden">
            {collection.mainImage ? (
              <Image
                src={collection.mainImage}
                alt={collection.title}
                fill
                className="object-cover"
                sizes="480px"
                unoptimized={shouldUnoptimize(collection.mainImage)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-[var(--muted)]">
                No image yet
              </div>
            )}
          </div>
          <div className="space-y-4">
            <input
              className={inputClass}
              placeholder="Image URL (optional)"
              value={collection.mainImage}
              onChange={(event) => updateCollection({ mainImage: event.target.value })}
            />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)] mb-2">
                Upload image
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    handleImageFile(file, (dataUrl) => updateCollection({ mainImage: dataUrl }));
                  }
                }}
                className="block w-full text-sm text-[var(--muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--button-bg)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.24em] file:text-white"
              />
              <p className="text-xs text-[var(--muted)] mt-2">
                Recommended: JPG/PNG under {MAX_IMAGE_MB}MB.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Gallery</p>
            <h2 className="text-xl font-semibold mt-2">Graphic design slides</h2>
            <p className="text-sm text-[var(--muted)] mt-2">
              Upload as many images as you want. They will appear in the same grid and gallery
              layout on the site.
            </p>
          </div>
          <button
            type="button"
            onClick={addSlide}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/70 text-sm font-semibold"
          >
            <Plus size={16} />
            Add slide
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {collection.subProjects.map((item, index) => (
            <div
              key={item.id ?? `${item.subTitle}-${index}`}
              className="rounded-2xl border border-[var(--glass-border)] bg-white/60 p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-5"
            >
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/50 bg-white/70">
                {item.subImage ? (
                  <Image
                    src={item.subImage}
                    alt={item.subTitle}
                    fill
                    className="object-cover"
                    sizes="360px"
                    unoptimized={shouldUnoptimize(item.subImage)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[var(--muted)]">
                    No image
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                    Slide {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-rose-500"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
                <input
                  className={inputClass}
                  placeholder="Slide title"
                  value={item.subTitle}
                  onChange={(event) => updateSubProject(index, { subTitle: event.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Image URL (optional)"
                  value={item.subImage}
                  onChange={(event) => updateSubProject(index, { subImage: event.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleImageFile(file, (dataUrl) => updateSubProject(index, { subImage: dataUrl }));
                    }
                  }}
                  className="block w-full text-sm text-[var(--muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--button-bg)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.24em] file:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
