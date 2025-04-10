// Mock implementation of Sanity's urlFor image builder
export const urlFor = (source) => {
  // Simple mock implementation that returns a URL based on the image reference
  if (!source) return '';
  
  // Extract the image number from the _ref, defaulting to 1 if not found
  const refMatch = source.asset && source.asset._ref ? source.asset._ref.match(/image-(\d+)/) : null;
  const imageNum = refMatch ? refMatch[1] : '1';
  
  // Build a builder-like interface to match Sanity's usage pattern
  return {
    width: () => {
      return {
        url: () => `images/image${imageNum}.jpeg`
      };
    },
    url: () => `images/image${imageNum}.jpeg`
  };
}; 