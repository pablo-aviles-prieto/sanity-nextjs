import { type SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';
import Image from 'next/image';
import { ParallaxImages } from '@/components/parallax/parallax-images';
import {
  ParallaxDefaultBanner,
  ParallaxDefaultBannerProps,
} from '@/components/parallax/parallax-banner';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  ]|order(publishedAt desc)[0...12]
  {
    _id, 
    title, 
    slug, 
    publishedAt, 
    "image": {
      "url": image.asset->url,
      "alt": image.alt, // Fetches the custom alt text
      "extension": image.asset->extension,
      "metadata": image.asset->metadata {
        dimensions {
          width,
          height
        }
      }
    },
    body
  }
`;

const IMAGES_QUERY = `
  *[_type == "imageBucket" && (title == "Banner background" || title == "Banner foreground")]{
    image{
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    title
  }
`;

const options = { next: { revalidate: 30 } };

const urlFor = (source: string, width: number, height: number) => {
  return `${source}?w=${width}&h=${height}&fit=crop`;
};

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const parallaxBanners = await client.fetch<SanityDocument[]>(IMAGES_QUERY, {}, options);

  const parallaxImages = [
    {
      src: urlFor(
        posts[0].image.url,
        Math.round(posts[0].image.metadata.dimensions.width / 3),
        Math.round(posts[0].image.metadata.dimensions.height / 3)
      ),
      speed: 10,
    },
    {
      src: urlFor(posts[0].image.url, 400, 100),
      speed: -10,
    },
  ];

  return (
    <main className='container mx-auto min-h-screen max-w-3xl p-8'>
      <h1 className='text-4xl font-bold mb-8'>Posts</h1>
      <ul className='flex flex-col gap-y-4'>
        {posts.map(post => (
          <li className='hover:underline' key={post._id}>
            <SomeImages post={post} />
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      <section className='py-4 h-[100vh] flex flex-col items-center justify-center'>
        <ParallaxImages parallaxImages={parallaxImages} />
      </section>
      <section className='h-[120vh]'>
        <ParallaxDefaultBanner
          imgsData={
            parallaxBanners.map(data => ({
              ...data,
              speed: data.title.includes('background') ? -40 : -10,
            })) as unknown as ParallaxDefaultBannerProps['imgsData']
          }
        />
      </section>
    </main>
  );
}

function SomeImages({ post }: { post: SanityDocument }) {
  return (
    <div className='flex items-center gap-x-2'>
      <Image
        src={urlFor(
          post.image.url,
          Math.round(post.image.metadata.dimensions.width / 3),
          Math.round(post.image.metadata.dimensions.height / 3)
        )}
        alt={post.image.alt || post.title}
        width={Math.round(post.image.metadata.dimensions.width / 3)}
        height={Math.round(post.image.metadata.dimensions.height / 3)}
      />
      <Image
        src={urlFor(
          post.image.url,
          Math.round(post.image.metadata.dimensions.width / 5),
          Math.round(post.image.metadata.dimensions.height / 3)
        )}
        alt={post.image.alt || post.title}
        width={Math.round(post.image.metadata.dimensions.width / 5)}
        height={Math.round(post.image.metadata.dimensions.height / 3)}
      />
      <Image
        src={urlFor(post.image.url, 400, 100)}
        alt={post.image.alt || post.title}
        width={300}
        height={50}
      />
    </div>
  );
}
