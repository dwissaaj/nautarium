import React from 'react'
import AudioWrapper from './AudioWrapper'
import TextWrapper from './TextWrapper'
import { Typography } from '@heroui/react'
import LoadAudioWrapper from './LoadAudioWrapper'

export default function page() {
  return (
<div className='flex flex-col gap-6'>
  <div>
    <LoadAudioWrapper />
  </div>
      <div className="flex flex-row justify-items-start w-full mt-8">
<div className='w-full bg-red-400'>
  <AudioWrapper />
</div>
<div className='w-full bg-blue-400'>
  <TextWrapper />
</div>
    </div>
</div>
  )
}
