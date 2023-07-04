import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  type UploadPartCommandInput,
  type CreateMultipartUploadCommandInput,
  type CompleteMultipartUploadCommandInput
} from '@aws-sdk/client-s3'
import { env } from '~/src/config/env'
import { s3AcceleratedClient, s3Client } from '@helpers/aws'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { Request, Response } from 'express'

export const initialize = async (req: Request, res: Response) => {
  const multipartOptions: CreateMultipartUploadCommandInput = {
    Bucket: env.BUCKETNAME,
    Key: req.body.filename
  }

  const cmd = new CreateMultipartUploadCommand(multipartOptions)
  const multipartUpload = await s3Client.send(cmd)

  res.setHeader('Access-Control-Allow-Origin', '*')
  return res.status(200).send({
    fileId: multipartUpload.UploadId,
    fileKey: multipartUpload.Key
  })
}

export const getPresignedUrls = async (req: Request, res: Response) => {
  const { fileId, fileKey, parts } = req.body

  const multipartParams: Omit<UploadPartCommandInput, 'PartNumber'> = {
    Bucket: env.BUCKETNAME,
    Key: fileKey,
    UploadId: fileId
  }

  const promises = []
  for (let i = 0; i < parts; i++) {
    const cmd = new UploadPartCommand({
      ...multipartParams,
      PartNumber: i + 1
    })

    promises.push(
      getSignedUrl(s3AcceleratedClient, cmd, {
        expiresIn: 60 * 15 // 15 minutes
      })
    )
  }

  const signedUrls = (await Promise.all(promises)).map((signedUrl, idx) => ({
    signedUrl,
    PartNumber: idx + 1
  }))

  res.setHeader('Access-Control-Allow-Origin', '*')
  return res.status(200).send({
    parts: signedUrls
  })
}

export const finalize = async (req: Request, res: Response) => {
  const { fileId, fileKey, parts } = req.body
  const sortedParts = parts.sort((a: any, b: any) => a.PartNumber - b.PartNumber)

  const multipartParams: CompleteMultipartUploadCommandInput = {
    Bucket: env.BUCKETNAME,
    Key: fileKey,
    UploadId: fileId,
    MultipartUpload: {
      Parts: sortedParts
    }
  }

  const cmd = new CompleteMultipartUploadCommand(multipartParams)
  const s3Response = await s3Client.send(cmd)

  res.setHeader('Access-Control-Allow-Origin', '*')
  return res.status(201).send({
    s3Response
  })
}
