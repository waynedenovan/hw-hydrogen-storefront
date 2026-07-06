import {describe, it, expect} from 'vitest';
import {
  getSupplierFolderPrefix,
  getProductCardImageSrc,
  getProductGalleryImageSrcs,
} from '~/lib/supplierImages';

describe('getSupplierFolderPrefix', () => {
  it('takes the first 4 lowercase chars for names longer than 4 chars', () => {
    expect(getSupplierFolderPrefix('Agrinet')).toBe('agri');
  });

  it('uses the full lowercase name when 4 chars or shorter', () => {
    expect(getSupplierFolderPrefix('Dab')).toBe('dab');
    expect(getSupplierFolderPrefix('Xylo')).toBe('xylo');
  });
});

describe('getProductCardImageSrc', () => {
  it('builds the bare productId.jpg path', () => {
    expect(getProductCardImageSrc('Agrinet', '430000376')).toBe(
      '/media/suppliers/agri/430000376.jpg',
    );
  });

  it('returns null when supplierName is missing', () => {
    expect(getProductCardImageSrc(null, '430000376')).toBeNull();
    expect(getProductCardImageSrc(undefined, '430000376')).toBeNull();
  });

  it('returns null when externalProductId is missing', () => {
    expect(getProductCardImageSrc('Agrinet', null)).toBeNull();
    expect(getProductCardImageSrc('Agrinet', undefined)).toBeNull();
  });
});

describe('getProductGalleryImageSrcs', () => {
  it('returns the bare image followed by numbered suffix candidates', () => {
    const srcs = getProductGalleryImageSrcs('Agrinet', '041744', 2);
    expect(srcs).toEqual([
      '/media/suppliers/agri/041744.jpg',
      '/media/suppliers/agri/041744_0.jpg',
      '/media/suppliers/agri/041744_1.jpg',
      '/media/suppliers/agri/041744_2.jpg',
    ]);
  });

  it('defaults to 10 suffix candidates (_0.._9)', () => {
    const srcs = getProductGalleryImageSrcs('Agrinet', '041744');
    expect(srcs).toHaveLength(11);
    expect(srcs[srcs.length - 1]).toBe('/media/suppliers/agri/041744_9.jpg');
  });

  it('returns an empty array when supplier or product id is missing', () => {
    expect(getProductGalleryImageSrcs(null, '041744')).toEqual([]);
    expect(getProductGalleryImageSrcs('Agrinet', null)).toEqual([]);
  });
});
