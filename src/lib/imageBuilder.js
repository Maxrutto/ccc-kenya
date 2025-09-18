// Mock implementation of Sanity's urlFor image builder
export const urlFor = (source) => {
  // If source is null or undefined, return placeholder
  if (!source) return 'images/placeholder.jpeg';
  
  // Handle specific image references for news articles
  const ref = source.asset && source.asset._ref ? source.asset._ref : null;
  let imageUrl = 'images/placeholder.jpeg';
  
  if (ref) {
    // Handle specific image references for bishops and special events
    switch (ref) {
      case 'bishop-kimengich':
        imageUrl = 'images/Bishop Kimengich.jpg';
        break;
      case 'ccck-10-years':
        imageUrl = 'images/CCCK at 10 years.jpg';
        break;
      case 'philip-anyolo':
        imageUrl = 'images/Philip Anyolo.webp';
        break;
      default:
        // Extract the image number from the _ref for generic images
        const refMatch = ref.match(/image-(\d+)/);
        if (refMatch) {
          const imageNum = refMatch[1] || '1';
          imageUrl = `images/image${imageNum}.jpeg`;
        }
    }
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