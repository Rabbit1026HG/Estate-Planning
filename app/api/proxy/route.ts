import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const data = await req.json();

    console.log("data: ", data);
    // Send the POST request to the Zapier webhook
    const response = await axios.post(
      'https://hooks.zapier.com/hooks/catch/21346468/2w4jkhf/',
      data,
    );

    // Return the response from the webhook
    return NextResponse.json({ success: true, status:response.status });
  } catch (error) {
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json(
      { success: false, error: error },
      { status: 500 }
    );
  }
}
