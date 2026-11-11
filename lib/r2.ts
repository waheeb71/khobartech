import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || "khobartech";
const publicUrl = (process.env.R2_PUBLIC_URL || "https://pub-e9788e46474044d585e2622e2c6ce74d.r2.dev").replace(/\/$/, "");

export function isR2Configured(): boolean {
  return Boolean(accountId && accessKeyId && secretAccessKey);
}

export function getR2Client(): S3Client | null {
  if (!isR2Configured()) {
    return null;
  }
  return new S3Client({
    region: "auto",
    endpoint: process.env.R2_BUCKET_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
  });
}

export function getR2PublicUrl(key: string): string {
  if (!key) return "";
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }
  const cleanKey = key.replace(/^\/+/, "");
  return `${publicUrl}/${cleanKey}`;
}

export async function uploadToR2({
  buffer,
  key,
  contentType,
}: {
  buffer: Buffer | Uint8Array;
  key: string;
  contentType: string;
}): Promise<{ key: string; url: string }> {
  const client = getR2Client();
  if (!client) {
    throw new Error("Cloudflare R2 is not configured. Please check environment variables.");
  }

  const cleanKey = key.replace(/^\/+/, "");

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: cleanKey,
    Body: buffer,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  });

  await client.send(command);

  return {
    key: cleanKey,
    url: `${publicUrl}/${cleanKey}`,
  };
}

export async function deleteFromR2(key: string): Promise<boolean> {
  const client = getR2Client();
  if (!client) return false;

  try {
    // If key contains the full public URL, extract the relative path
    let cleanKey = key.replace(/^\/+/, "");
    if (cleanKey.startsWith(publicUrl)) {
      cleanKey = cleanKey.replace(publicUrl, "").replace(/^\/+/, "");
    }

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: cleanKey,
    });
    await client.send(command);
    return true;
  } catch (error) {
    console.error("Failed to delete from R2:", error);
    return false;
  }
}
