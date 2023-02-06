'use client'

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ClientChange() {

    const [loading, setLoading] = useState(false)
    const params = useSearchParams()

    const router = useRouter()

    return (
        <div>
            <button
                className='bg-blue-600 p-4 rounded-lg ml-5'
                onClick={() => {
                    console.log(params.get("num"))
                    const num = parseInt(params.get("num") as string) + 1
                    router.replace(`/?num=${num}`)
                }}
            >
                Increase Search Param num
            </button>
        </div>
    )

    
}