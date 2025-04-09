import { useState, useEffect, useCallback, memo } from 'react';
import { client } from '../lib/sanity';
import { urlFor } from '../lib/imageBuilder';
import { PortableText } from '@portabletext/react';
import AnimWrapper from '../components/UI/AnimWrapper';
import Loader from '../components/UI/Loader';
import { format } from 'date-fns';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';

function News() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchNews() {
      try {
        const newsData = await client.fetch(`
          *[_type == "news"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            excerpt,
            body,
            mainImage,
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
        
        const categoriesData = await client.fetch(`
          *[_type == "category"] {
            _id,
            title
          }
        `);
        
        setNews(newsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const filteredNews = useCallback(() => {
    if (activeFilter === 'all') return news;
    return news.filter(item => 
      item.categories && item.categories.some(cat => cat._id === activeFilter)
    );
  }, [news, activeFilter]);

  if (loading) return <Loader />;

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-playfair text-secondary">
              News & Events
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12">
              Stay updated with the latest happenings, events, and announcements from our contemplative communities.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.3}>
            <div className="flex flex-wrap justify-center mb-10 gap-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm ${
                  activeFilter === 'all' 
                    ? 'bg-secondary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category._id}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter === category._id 
                      ? 'bg-secondary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
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
              {filteredNews().map((item, index) => (
                <div 
                  key={item._id} 
                  className="card break-inside-avoid mb-6"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {item.mainImage && (
                    <div className="overflow-hidden rounded-t-xl">
                      <img 
                        src={urlFor(item.mainImage).width(600).url()} 
                        alt={item.title}
                        className="w-full object-cover aspect-video"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap">
                      <div className="flex items-center mr-4 mb-2">
                        <FaCalendarAlt className="mr-1" />
                        <span>
                          {item.publishedAt ? format(new Date(item.publishedAt), 'MMMM d, yyyy') : 'No date'}
                        </span>
                      </div>
                      
                      {item.categories && item.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.categories.map(cat => (
                            <span 
                              key={cat._id} 
                              className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs"
                            >
                              <FaTag className="mr-1" />
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {item.excerpt && (
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    )}
                    
                    <button className="btn text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
}

export default memo(News);