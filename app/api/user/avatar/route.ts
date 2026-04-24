import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  AVATAR_BUCKET,
  createSupabaseServerClient,
  isSupabaseStorageConfigured,
} from '@/lib/supabase/server'

export const runtime = 'nodejs'

const MAX_AVATAR_SIZE = 2 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
])

function getPublicAvatarPath(imageUrl: string | null | undefined) {
  if (!imageUrl) return null

  try {
    const url = new URL(imageUrl)
    const marker = `/storage/v1/object/public/${AVATAR_BUCKET}/`
    const markerIndex = url.pathname.indexOf(marker)

    if (markerIndex === -1) return null

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length))
  } catch {
    return null
  }
}

async function ensureAvatarBucket(supabase: ReturnType<typeof createSupabaseServerClient>) {
  const { data: bucket, error: getBucketError } = await supabase.storage.getBucket(AVATAR_BUCKET)

  if (!getBucketError) {
    if (bucket.public) return null

    const { error: updateBucketError } = await supabase.storage.updateBucket(AVATAR_BUCKET, {
      public: true,
      fileSizeLimit: MAX_AVATAR_SIZE,
      allowedMimeTypes: Array.from(ALLOWED_IMAGE_TYPES.keys()),
    })

    return updateBucketError
  }

  const { error: createBucketError } = await supabase.storage.createBucket(AVATAR_BUCKET, {
    public: true,
    fileSizeLimit: MAX_AVATAR_SIZE,
    allowedMimeTypes: Array.from(ALLOWED_IMAGE_TYPES.keys()),
  })

  if (
    createBucketError &&
    !createBucketError.message.toLowerCase().includes('already exists')
  ) {
    return createBucketError
  }

  return null
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  if (!isSupabaseStorageConfigured()) {
    return NextResponse.json(
        { error: 'Supabase Storage não está configurado no servidor' },
      { status: 500 }
    )
  }

  const formData = await req.formData()
  const avatar = formData.get('avatar')

  if (!(avatar instanceof File)) {
    return NextResponse.json({ error: 'Envie uma imagem valida' }, { status: 400 })
  }

  const extension = ALLOWED_IMAGE_TYPES.get(avatar.type)
  if (!extension) {
    return NextResponse.json(
      { error: 'Use uma imagem JPG, PNG ou WebP' },
      { status: 400 }
    )
  }

  if (avatar.size > MAX_AVATAR_SIZE) {
    return NextResponse.json(
      { error: 'A imagem deve ter no maximo 2 MB' },
      { status: 400 }
    )
  }

  const supabase = createSupabaseServerClient()
  const bucketError = await ensureAvatarBucket(supabase)
  if (bucketError) {
    return NextResponse.json(
        { error: 'Não foi possível preparar o bucket de avatars' },
      { status: 500 }
    )
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  })

  const storagePath = `${session.user.id}/avatar-${Date.now()}.${extension}`
  const bytes = await avatar.arrayBuffer()

  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(storagePath, bytes, {
      contentType: avatar.type,
      cacheControl: '31536000',
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json(
      { error: 'Não foi possível enviar o avatar' },
      { status: 500 }
    )
  }

  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(storagePath)
  const image = data.publicUrl

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { image },
    select: { id: true, name: true, email: true, image: true, nickname: true },
  })

  const oldPath = getPublicAvatarPath(currentUser?.image)
  if (oldPath && oldPath !== storagePath) {
    await supabase.storage.from(AVATAR_BUCKET).remove([oldPath])
  }

  return NextResponse.json({ user })
}
