import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';

interface CollectionCardProps {
  collection: {
    id: string;
    title: string;
    handle: string;
    image?: {
      url: string;
      altText?: string | null;
      width?: number;
      height?: number;
    } | null;
  };
}

export function CollectionCard({collection}: CollectionCardProps) {
  return (
    <Link
      key={collection.id}
      className="collection-item"
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection.image && (
        <Image
          data={collection.image}
          aspectRatio="1/1"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
      )}
      <h3 className="mt-2 font-semibold">{collection.title}</h3>
    </Link>
  );
}
