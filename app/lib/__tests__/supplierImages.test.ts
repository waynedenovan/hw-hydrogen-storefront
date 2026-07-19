import {describe, it, expect} from 'vitest';
import {
  getSupplierFolderPrefix,
  getProductCardImageSrc,
  getProductGalleryImageSrcs,
  normalizeProductIdForImage,
} from '~/lib/supplierImages';

describe('normalizeProductIdForImage', () => {
  it('strips "/" from the product id', () => {
    expect(normalizeProductIdForImage('AO757/0813')).toBe('AO7570813');
  });

  it('strips " " from the product id', () => {
    expect(normalizeProductIdForImage('AO757 0813')).toBe('AO7570813');
    expect(normalizeProductIdForImage(' PASJET24')).toBe('PASJET24');
  });

  it('strips both characters anywhere in the id', () => {
    expect(normalizeProductIdForImage('AO199/0616 P')).toBe('AO1990616P');
  });

  it('passes clean ids through unchanged', () => {
    expect(normalizeProductIdForImage('430000376')).toBe('430000376');
  });

  it('returns null for missing or empty-after-strip ids', () => {
    expect(normalizeProductIdForImage(null)).toBeNull();
    expect(normalizeProductIdForImage(undefined)).toBeNull();
    expect(normalizeProductIdForImage(' / ')).toBeNull();
  });
});

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

  it('excludes " " and "/" from the id when building the filename', () => {
    expect(getProductCardImageSrc('Agrinet', 'AO757/0813')).toBe(
      '/media/suppliers/agri/AO7570813.jpg',
    );
    expect(getProductCardImageSrc('Agrinet', 'AO757 0813')).toBe(
      '/media/suppliers/agri/AO7570813.jpg',
    );
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

  it('excludes " " and "/" from the id in every candidate', () => {
    const srcs = getProductGalleryImageSrcs('Agrinet', 'AO757/0813', 1);
    expect(srcs).toEqual([
      '/media/suppliers/agri/AO7570813.jpg',
      '/media/suppliers/agri/AO7570813_0.jpg',
      '/media/suppliers/agri/AO7570813_1.jpg',
    ]);
  });
});
