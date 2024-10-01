import MuiPaper from '@/components/paper/Paper'
import MuiSkeleton from '@/components/skeleton/Skeleton'
import React from 'react'

const DasboardProfileLoading = () => {
  return (
    <MuiPaper className="flex items-center justify-center min-h-[240px] gap-6 p-4">
      <MuiSkeleton width={140} height={140} variant='circular'/>
    </MuiPaper>
  )
}

export default DasboardProfileLoading