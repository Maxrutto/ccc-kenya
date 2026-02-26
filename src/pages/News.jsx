import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/imageBuilder';
import AnimWrapper from '../components/UI/AnimWrapper';
import Loader from '../components/UI/Loader';
import { FaCalendarAlt, FaTag, FaTimes } from 'react-icons/fa';

// Custom component for rendering Portable Text
// Supports: plain text spans, strong marks, bullet lists
const CustomPortableText = ({ value }) => {
  if (!value) return null;

  const renderSpan = (child, i) => {
    if (child.marks && child.marks.includes('strong')) {
      return <strong key={i}>{child.text}</strong>;
    }
    return <span key={i}>{child.text}</span>;
  };

  const renderChildren = (block) =>
    block.children && block.children.map((child, i) => renderSpan(child, i));

  // Pre-pass: group consecutive bullet blocks into unified list structures
  const groups = [];
  let currentBullets = [];

  for (let i = 0; i < value.length; i++) {
    const block = value[i];
    if (block.listItem === 'bullet') {
      currentBullets.push({ block, index: i });
    } else {
      if (currentBullets.length > 0) {
        groups.push({ type: 'list', items: currentBullets });
        currentBullets = [];
      }
      groups.push({ type: 'paragraph', block, index: i });
    }
  }
  if (currentBullets.length > 0) {
    groups.push({ type: 'list', items: currentBullets });
  }

  return (
    <div className="text-gray-700 font-['Montserrat'] text-sm leading-relaxed space-y-2">
      {groups.map((group, gIdx) => {
        if (group.type === 'list') {
          return (
            <ul key={`list-${gIdx}`} className="list-disc pl-5 my-2 space-y-1">
              {group.items.map(({ block, index }) => (
                <li key={index}>{renderChildren(block)}</li>
              ))}
            </ul>
          );
        }
        return <p key={group.index}>{renderChildren(group.block)}</p>;
      })}
    </div>
  );
};

function News() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedArticle]);

  // Use a more robust method to fetch and handle news data
  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      try {
        // Set a longer timeout for slower connections
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), 10000)
        );

        const newsPromise = client.fetch(`
          *[_type == "news"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            excerpt,
            body,
            publishedAt,
            categories[]->{
              _id,
              title
            },
            author->{
              name,
              image
            }
          }
        `);

        const categoriesPromise = client.fetch(`
          *[_type == "category"] {
            _id,
            title
          }
        `);

        // Use Promise.race to handle timeouts
        const [newsData, categoriesData] = await Promise.all([
          Promise.race([newsPromise, timeoutPromise]),
          Promise.race([categoriesPromise, timeoutPromise])
        ]);
        
        if (isMounted) {
          setNews(newsData || []);
          setCategories(categoriesData || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        if (isMounted) {
          // Set default data if fetch fails
          setNews([]);
          setCategories([]);
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredNews = useCallback(() => {
    if (activeFilter === 'all') return news;
    return news.filter(item => 
      item.categories && item.categories.some(cat => cat._id === activeFilter)
    );
  }, [news, activeFilter]);

  if (loading) return <Loader />;

  return (
    <div className="pt-16 pb-12 w-full overflow-x-hidden">
      <section className="py-16 md:py-20 w-full">
        <div className="container mx-auto px-2 sm:px-4 max-w-full">
          <AnimWrapper>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600">
              News & Events
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat'] text-gray-700">
              Stay updated with the latest happenings, events, and announcements from our contemplative communities.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.3}>
            <div className="flex flex-wrap justify-center mb-10 gap-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-['Montserrat'] transition-all duration-300 ${
                  activeFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category._id}
                  className={`px-4 py-2 rounded-full text-sm font-['Montserrat'] transition-all duration-300 ${
                    activeFilter === category._id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveFilter(category._id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.5}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredNews().length > 0 ? (
                filteredNews().map((item, index) => {
                  // Check if this item should have an image (only our two specific announcements)
                  const shouldShowImage = item.mainImage && 
                    (item.mainImage.asset._ref === 'bishop-kimengich' || 
                     item.mainImage.asset._ref === 'ccck-10-years' ||
                     item.mainImage.asset._ref === 'philip-anyolo') ||
                    (item._id === 'news-new-2' && item.author && item.author.image && item.author.image.asset._ref === 'philip-anyolo');

                  return (
                    <div 
                      key={item._id} 
                      className="card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      {/* News Image - Only for specific announcements */}
                      {shouldShowImage && (
                        <>
                          {/* Special layout for Anniversary announcement with both images */}
                          {item._id === 'news-new-2' ? (
                            <div className="h-48 sm:h-52 md:h-56 overflow-hidden bg-gray-50 flex">
                              {/* CCCK 10 Years Logo - Left Side */}
                              <div className="w-1/2 h-full flex items-center justify-center p-2">
                                <img 
                                  src={urlFor(item.mainImage).url()}
                                  alt="CCCK 10th Anniversary"
                                  className="max-w-full max-h-full object-contain transition-transform hover:scale-105 duration-500"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                              {/* Archbishop Philip Anyolo - Right Side */}
                              <div className="w-1/2 h-full overflow-hidden">
                                <img 
                                  src={urlFor(item.author.image).url()}
                                  alt="Archbishop Philip Anyolo"
                                  className="w-full h-full object-cover object-[50%_20%] transition-transform hover:scale-105 duration-500"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            /* Single image layout for other announcements */
                            <div className="h-48 sm:h-52 md:h-56 overflow-hidden">
                              <img 
                                src={urlFor(item.mainImage).url()}
                                alt={item.title}
                                className={`w-full h-full transition-transform hover:scale-105 duration-500 ${
                                  item.mainImage.asset._ref === 'bishop-kimengich' ? 'object-contain bg-gray-50' :
                                  'object-cover'
                                }`}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-['Playfair_Display'] font-bold mb-3 text-blue-700 leading-tight">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4 flex-wrap">
                          <div className="flex items-center mr-4 mb-2 font-['Montserrat']">
                            <FaCalendarAlt className="mr-1 text-blue-500" />
                            <span>
                              {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : 'No date'}
                            </span>
                          </div>
                          
                          {item.categories && item.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                              {item.categories.map(cat => (
                                <span 
                                  key={cat._id} 
                                  className="flex items-center px-2 py-1 bg-blue-50 rounded-full text-xs font-['Montserrat'] text-blue-600"
                                >
                                  <FaTag className="mr-1 text-blue-500" />
                                  {cat.title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {item.excerpt && (
                          <p className="text-gray-600 text-sm sm:text-base font-['Montserrat'] leading-relaxed">
                            {item.excerpt}
                          </p>
                        )}

                        {item.body && item.body.length > 0 && (
                          <button
                            onClick={() => setSelectedArticle(item)}
                            className="mt-4 text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors font-['Montserrat']"
                          >
                            Read Full Article
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full bg-white rounded-lg shadow p-6 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No news articles found</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Check back later for updates.</p>
                </div>
              )}
            </div>
          </AnimWrapper>
        </div>
      </section>

      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-blue-700 leading-tight">
                  {selectedArticle.title}
                </h2>
                {selectedArticle.publishedAt && (
                  <p className="text-sm text-gray-500 mt-1 font-['Montserrat']">
                    {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="ml-4 p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <CustomPortableText value={selectedArticle.body} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(News);
