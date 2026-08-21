"use client";

/**
 * Compresses and resizes an image file if it exceeds size or dimension limits.
 * Outputs standard JPEG or PNG formats compatible with backend ImageIO processors.
 * If the file is already under `maxSizeBytes` (default 200KB), it returns the original file untouched.
 */
export async function compressImageIfNeeded(
  file: File,
  maxDimension = 600,
  maxSizeBytes = 200 * 1024,
  quality = 0.85
): Promise<File> {
  if (file.size <= maxSizeBytes) {
    return file;
  }

  return new Promise((resolve) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      const targetType = file.type === "image/png" ? "image/png" : "image/jpeg";
      if (targetType === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          if (blob.size >= file.size) {
            resolve(file);
            return;
          }

          const ext = targetType === "image/png" ? ".png" : ".jpg";
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ext;
          const compressedFile = new File([blob], newFileName, {
            type: targetType,
            lastModified: Date.now(),
          });

          resolve(compressedFile);
        },
        targetType,
        quality
      );
    };

    img.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
