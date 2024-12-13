import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: Request, response: Response) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    const postData = await req.json()
    
    const {gRecaptchaToken} = postData

    let res;

    const formData = `secret=${secretKey}&response=${gRecaptchaToken}`

    try {
        res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
    } catch (error) {
        return NextResponse.json({success: false})
    }

    const result = await res.json();

    if(result && result?.success && result?.score > 0.5 ) {
        console.log('result.data?.score', result.data?.score)
        return NextResponse.json({success: true, score: result.data?.score})
    } else {
        return NextResponse.json({success: false})
    }
} 


