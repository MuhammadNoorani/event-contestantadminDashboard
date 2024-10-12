import { NextResponse } from 'next/server';
import pinata from '@/lib/pinata';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const contestId = formData.get('contestId') as string;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const result = await pinata.pinFileToIPFS(file);
    
    const { data, error } = await supabase
      .from('entries')
      .insert({
        contestId,
        fileUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
        status: 'pending',
      });

    if (error) throw error;

    return NextResponse.json({ message: 'File uploaded successfully', data });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}