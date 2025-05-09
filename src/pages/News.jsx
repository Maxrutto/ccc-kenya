import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { client } from '../lib/sanity';
import AnimWrapper from '../components/UI/AnimWrapper';
import Loader from '../components/UI/Loader';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';

// Custom component for rendering Portable Text
const CustomPortableText = ({ value }) => {
  if (!value) return null;
  
  // Simple renderer that just outputs the text content
  return (
    <div>
      {value.map((block, index) => (
        <p key={index}>
          {block.children && block.children.map((child, i) => (
            <span key={i}>{child.text}</span>
          ))}
        </p>
      ))}
    </div>
  );
};

function News() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

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
            <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredNews().length > 0 ? (
                filteredNews().map((item, index) => (
                  <div 
                    key={item._id} 
                    className="card break-inside-avoid mb-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-['Playfair_Display'] font-bold mb-3 text-blue-700">{item.title}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap">
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
                          <div className="flex flex-wrap gap-2 mb-2">
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
                        <p className="text-gray-600 mb-4 font-['Montserrat']">{item.excerpt}</p>
                      )}
                      
                      <button className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-['Montserrat']">
                        Read More
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No news articles found</h3>
                  <p className="text-gray-600">Check back later for updates.</p>
                </div>
              )}
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
}

export default memo(News);