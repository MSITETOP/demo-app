<script setup lang="ts">
import PlayCircleIcon from '@bitrix24/b24icons-vue/main/PlayCircleIcon'
import { readBody } from 'h3'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

useHead({
  title: 'Bitrix24 UI - Starter'
})

const handleRequest = async () => {
    const event = useRequestEvent()
    if (event?.method === 'POST') {
      const body = await readBody(event)
      console.log('POST Request Data:', body)

      // Initialize S3 client with custom endpoint
      const s3Client = new S3Client({
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
        },
        forcePathStyle: true // Required for some S3-compatible storage services
      })

      // Upload to S3
      const fileName = `${body.member_id}.json`
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET || '',
        Key: fileName,
        Body: JSON.stringify(body, null, 2),
        ContentType: 'application/json'
      })

      await s3Client.send(command)
      console.log(`Successfully uploaded ${fileName} to S3`)
    }
}

// Call the function
handleRequest()

onMounted(async () => {
	try
	{
		const { $initializeB24Frame } = useNuxtApp()
		const $b24 = await $initializeB24Frame()
		await $b24.installFinish()
	}
	catch(error)
	{
		console.error('Error initializing B24 frame:', error)
	}
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-16 h-screen">
  <h1 class="font-b24-secondary text-h1 sm:text-8xl font-light">
    Install
  </h1>
  </div>
</template>
