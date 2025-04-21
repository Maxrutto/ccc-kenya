// Mock implementation of Sanity's urlFor image builder
export const urlFor = (source) => {
  // If source is null or undefined, return placeholder
  if (!source) return 'images/placeholder.jpeg';
  
  // Extract the image number from the _ref, defaulting to a placeholder if not found
  const refMatch = source.asset && source.asset._ref ? source.asset._ref.match(/image-(\d+)/) : null;
  
  // If we have a ref match, use it, otherwise use placeholder
  let imageUrl = 'images/placeholder.jpeg';
  
  if (refMatch) {
    const imageNum = refMatch[1] || '1';
    // Try to use a specific image number if available
    imageUrl = `images/image${imageNum}.jpeg`;
  }
  
  // Build a builder-like interface to match Sanity's usage pattern
  return {
    width: () => {
      return {
        url: () => imageUrl
      };
    },
    url: () => imageUrl
  };
}; 