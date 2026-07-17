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
  /**
   * Heading element for the tile name — spec (2607171535): main Collections use
   * h2, Sub Collections use h3. The name is centred both horizontally and
   * vertically over the tile; the dark chip look comes from the sitewide
   * reset.css h1-h5 rule (the standard for text over images).
   */
  headingLevel?: 'h2' | 'h3';
}

export function CollectionCard({collection, headingLevel = 'h3'}: CollectionCardProps) {
  const Heading = headingLevel;
  return (
    <Link
      key={collection.id}
      className="collection-item"
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      <div className="collection-item-media">
        {collection.image ? (
          <Image
            data={collection.image}
            aspectRatio="1/1"
            sizes="(min-width: 768px) 25vw, 50vw"
          />
        ) : (
          <div className="collection-item-placeholder" aria-hidden="true" />
        )}
        <span className="collection-item-title-wrap">
          <Heading className="collection-item-title">{collection.title}</Heading>
        </span>
      </div>
    </Link>
  );
}
