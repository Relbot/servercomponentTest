'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';


export default function ClientChange() {

    const params = useSearchParams()
    const [isPending, startTransition] = useTransition();

    const router = useRouter()

    return (
        <div>
            <button
                className='bg-blue-600 p-4 rounded-lg ml-5'
                onClick={() => {
                    const num = params.get("num")
                    
                    if (num) {
                        startTransition(() => {
                            // Refresh the current route and fetch new data from the server without
                            // losing client-side browser or React state.
                            router.replace(`/?num=${parseInt(params.get("num") as string) + 1}`)
                          });
                    } else {
                        router.replace(`/?num=0`)
                    }
                    console.log()

                }}
            >
                Increase Search Param num {isPending ? "Laoding..." : ""}
            </button>
        </div>
    )

    
}