import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  type UploadPartCommandInput,
  type CreateMultipartUploadCommandInput,
  type CompleteMultipartUploadCommandInput
} from '@aws-sdk/client-s3'
import { env } from '~/src/config/env'
import { s3Client } from '@helpers/aws'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { NextFunction, Request, Response } from 'express'

export const initialize = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (e) {
    console.log('🚀 ~ file: controller.ts:30 ~ initialize ~ e:', e)
    return next(e)
  }
}

interface RequestBody {
  fileId: string
  fileKey: string
}
export const getPresignedUrls = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId, fileKey, parts } = req.body as RequestBody & { parts: number }

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
        getSignedUrl(s3Client, cmd, {
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
  } catch (e) {
    console.log('🚀 ~ file: controller.ts:69 ~ getPresignedUrls ~ e:', e)
    return next(e)
  }
}

interface FinalizedPart {
  PartNumber: number
  ETag: string // response.headers.ETag from upload of s3 presigned Url
}
export const finalize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId, fileKey, parts } = req.body as RequestBody & { parts: FinalizedPart[] }
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
  } catch (e) {
    console.log('🚀 ~ file: controller.ts:96 ~ finalize ~ e:', e)
    return next(e)
  }
}
