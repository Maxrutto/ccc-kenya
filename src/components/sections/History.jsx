import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimWrapper from '../UI/AnimWrapper';
import { useEffect, useState } from 'react';

export default function History() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const titleClass = isSmallMobile 
    ? "text-lg font-['Playfair_Display'] font-bold mb-2 text-center text-blue-600"
    : isMobile
      ? "text-xl font-['Playfair_Display'] font-bold mb-3 text-center text-blue-600"
      : "text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 md:mb-6 text-center text-blue-600";

  const subtitleClass = isSmallMobile
    ? "text-base font-['Playfair_Display'] font-semibold mb-2 text-blue-600"
    : isMobile
      ? "text-lg font-['Playfair_Display'] font-semibold mb-3 text-blue-600"
      : "text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-semibold mb-3 md:mb-5 text-blue-600";

  const textClass = isSmallMobile
    ? "text-xs text-gray-700 mb-2 leading-relaxed font-['Montserrat']"
    : isMobile
      ? "text-sm text-gray-700 mb-3 leading-relaxed font-['Montserrat']"
      : "text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed font-['Montserrat']";

  const sectionPadding = isSmallMobile
    ? "py-3 mt-1 w-full overflow-hidden"
    : isMobile
      ? "py-4 mt-2 w-full overflow-hidden"
      : "py-8 md:py-16 mt-4 md:mt-8 w-full overflow-hidden";

  const cardPadding = isSmallMobile
    ? "p-2 shadow-sm"
    : isMobile
      ? "p-3 shadow-sm"
      : "p-5 md:p-8 shadow-sm";

  const cardMargin = isSmallMobile
    ? "mt-3"
    : isMobile
      ? "mt-4"
      : "mt-8 md:mt-12";

  return (
    <section className={sectionPadding} id="history">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <AnimWrapper>
            <div className={`bg-blue-50/70 rounded-lg ${cardPadding} border-l-2 border-red-400`}>
              <h2 className={titleClass}>
                WHY WE CAME <span className="text-red-600">TOGETHER</span>?
              </h2>
              <p className={`${textClass} text-left md:text-center`}>
                With the encouragement and help of the Holy See, our monasteries chose to come together so that, by
                combined effort, we can truly live our primary common vocation as intercessors before God for the needs of the church, as well as those who are outside our Catholic faith. In this synodal journey, we are also able to help each other to achieve more fully the purpose of our respective religious institutes.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.2}>
            <div className={`${cardMargin} bg-white rounded-lg ${cardPadding}`}>
              <h2 className={titleClass}>
                THE BIRTH OF CCCK: <span className="text-red-600">Sept 2015</span>
              </h2>
              <p className={textClass}>
                The birth of the Conference of Contemplative Communities of Kenya (CCCK) happened within the context of the Year of Consecrated Life and in harmony with the renewal of the life for women contemplatives which Pope Francis had ushered. Conscious of the need to update the theological education of cloistered nuns, the superiors of the first nineteen monasteries in Kenya collaborated with a few apostolic religious to develop a curriculum for their sisters. After receiving the permission and encouragement of the Congregation for Institutes of Consecrated Life and Societies of Apostolic Life (CICLSAL), they scheduled a month-long program from 28 September to 23 October 2015 at the Subiaco Retreat Centre in Karen, Nairobi.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.3}>
            <div className={`${cardMargin} bg-white rounded-lg ${cardPadding} border-r-2 border-red-400`}>
              <h3 className={subtitleClass}>
                The Need to Start a <span className="text-red-600">Nuns' Conference</span>
              </h3>
              <p className={textClass}>
                During his visit to Kenya around that period, Cardinal João Braz de Avís, prefect of CICLSAL, invited these prioresses and their collaborators to dialogue with him on 22 September so he could directly know from them the state of women contemplatives in Africa. On realizing that their common concerns extend beyond theological updating to include religious and human formation, leadership and financial management training, and infrastructural and sustainability problems, he encouraged them to form themselves into a conference of major superiors.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.4}>
            <div className={`${cardMargin} bg-white rounded-lg ${cardPadding} border-l-2 border-blue-400`}>
              <h3 className={subtitleClass}>
                <span className="text-red-600">Sept 2016</span>: Nuns From Other Countries Join CCCK
              </h3>
              <p className={textClass}>
                After a year of dialoguing among themselves, their respective monastic chapters, as well as the desire to comply with the recently promulgated Apostolic Constitution Vultum Dei Quaerere, these major superiors unanimously voted to accept the prefect's proposal in their October 2016 assembly.
                The Holy See accepted their decision and asked them to develop its proper law. Meanwhile, monasteries from Tanzania, Uganda, Zambia, South Africa, and Malawi received the Holy See's permission to participate in the 2016 theological program for nuns in Kenya to ensure the on-going formation of their own sisters. Eventually, this annual school for nuns became known as Venite Seorsum Theology program.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.5}>
            <div className={`${cardMargin} mb-4 sm:mb-6 bg-white rounded-lg ${cardPadding} border-b-2 border-red-400`}>
              <h3 className={subtitleClass}>
                <span className="text-red-600">Oct. 2017</span>: Pontifical Approval of CCCK
              </h3>
              <p className={textClass}>
                The success and fruitfulness of the 2016 programs led other monasteries from Cameroon, Nigeria, and Zimbabwe to participate in both the 2017 Venite Seorsum Program and the assembly of the prioresses. In the presence of Fr. Stefano Cañuto, senior official of the CICLSAL section for monastic life, the assembled superiors finalized the confection of the statutes of CCCK on 6 October 2017. On that same day, the Kenyan prioresses elected and nominated the first officials of the conference. The following 26 October, CICLSAL issued a decree approving the aforementioned statutes. By this act, the Holy See effectively erected CCCK as a juridic persons under its direction (can. 709).
              </p>
            </div>
          </AnimWrapper>
        </motion.div>
      </div>
    </section>
  );
} 