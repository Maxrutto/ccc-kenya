import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaQuoteLeft, FaQuoteRight, FaChurch } from 'react-icons/fa';
import AnimWrapper from '../components/UI/AnimWrapper';
import LazyImage from '../components/UI/LazyImage';

// Sample blog post data - this would eventually come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "NEW FOUNDATION: The Monastery of Our Lady of Protection",
    date: "March 15, 2024",
    author: "Carmelite Nuns of Kitui",
    excerpt: "The story of establishing a new Carmelite monastery in Kitui Diocese, Kenya.",
    image: "images/Carmelite Monastery Kitui.jpg",
    content: [
      {
        type: "quote",
        text: "\"Go out to the whole world, proclaim the Good News\" Mark 16:15"
      },
      {
        type: "quote",
        text: "\"Make as many foundations as the hair in your head\" \"The Book of Her Foundations.\" St. Teresa's"
      },
      {
        type: "paragraph",
        text: "This words of encouragement of the prior general Rubeo to St Teresa of Avila finds an echo in the nuns who are filled with zeal to spread the silent apostolate of a cloistered contemplative way of life to the whole world. It is with this zeal that the Monastery of our Lady of Mount Carmel, Machakos responded to the request of Rt. Rev. Antony Muheria who by then was the Bishop of Diocese of Kitui to make a foundation in His diocese."
      },
      {
        type: "paragraph",
        text: "The monastery of our Lady of protection was a long-term dream of Rt. Rev. Antony Muheria, as his plan was to have a Marian shrine and the monastery nearby, both under the patronage of our Lady of Protection, for he believed that the presence of Mary and the nuns' praying presence, will obtain great graces in strengthening the faith of the people of Kitui and bring them closer to God."
      },
      {
        type: "paragraph",
        text: "The monastery of our Lady of Protection is in Kitui Diocese, near the shrine of our Lady of Protection in a place called Museve (meaning wind) which is 9 kilometers from Kitui town and the land where the monastery is built is (approximately 5 hectares). Kitui is a neighboring town with Machakos, situated in the Eastern Province of Kenya."
      },
      {
        type: "paragraph",
        text: "The Nuns of the Monastery of our Lady of Mount Carmel, Machakos, after obtaining permission from the Dicastry of Institutes of Consecrated life and Societies of Apostolic life, for the establishment of the new foundation, gladly sent six sisters to start this new foundation and It was on 1st of September 2023 that the monastery was officially opened by his lordship Joseph Mwongela, Bishop Catholic Diocese of Kitui."
      }
    ]
  }
];

export default function Blog() {
  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4 text-blue-600">
                Contemplative <span className="text-red-600">Voices</span>
              </h1>
              <p className="text-lg max-w-3xl mx-auto font-['Montserrat'] text-gray-700">
                Stories, reflections, and experiences from our monasteries sharing the beauty and challenges of contemplative life in Africa.
              </p>
            </div>
          </AnimWrapper>

          {/* Blog post list */}
          <div className="max-w-4xl mx-auto">
            {blogPosts.map((post) => (
              <AnimWrapper key={post.id} delay={0.2}>
                <article className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
                  {/* Post header */}
                  <div className="p-6 md:p-8 pb-0">
                    <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-blue-700 mb-3">
                      {post.title}
                    </h2>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 font-['Montserrat']">
                      <div className="flex items-center mr-6 mb-2">
                        <FaCalendarAlt className="mr-2 text-red-500" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <FaChurch className="mr-2 text-blue-500" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post image */}
                  <div className="px-6 md:px-8 mb-6">
                    <div className="rounded-lg overflow-hidden shadow-sm h-64 md:h-96">
                      <LazyImage
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="p-6 md:p-8 pt-0 font-['Montserrat'] text-gray-700">
                    {post.content.map((block, idx) => {
                      if (block.type === "quote") {
                        return (
                          <div key={idx} className="my-6 p-4 border-l-4 border-red-400 bg-blue-50 rounded">
                            <div className="flex items-start">
                              <FaQuoteLeft className="text-red-400 mr-2 text-lg flex-shrink-0 mt-1" />
                              <p className="italic text-lg">{block.text}</p>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <p key={idx} className="mb-4 leading-relaxed">
                            {block.text}
                          </p>
                        );
                      }
                    })}
                  </div>
                </article>
              </AnimWrapper>
            ))}
          </div>

          {/* Empty state / future posts indicator */}
          <AnimWrapper delay={0.4}>
            <div className="text-center mt-8">
              <div className="p-8 border border-dashed border-blue-200 rounded-xl max-w-4xl mx-auto">
                <h3 className="text-xl font-['Playfair_Display'] text-blue-600 mb-2">More Stories Coming Soon</h3>
                <p className="text-gray-600 font-['Montserrat']">
                  Check back regularly as we share more experiences from contemplative life in our monasteries.
                </p>
              </div>
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
} 