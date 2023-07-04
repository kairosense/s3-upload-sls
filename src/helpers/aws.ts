import { S3Client } from '@aws-sdk/client-s3'

const REGION = 'ap-south-1'

export const s3Client = new S3Client({
  region: REGION
})

export const s3AcceleratedClient = new S3Client({
  useAccelerateEndpoint: true,
  region: REGION
})
